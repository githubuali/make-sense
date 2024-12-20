/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {ISize} from "../../../interfaces/ISize";
import {IRect} from "../../../interfaces/IRect";
import Scrollbars from 'react-custom-scrollbars-2';
import {VirtualListUtil} from "../../../utils/VirtualListUtil";
import {IPoint} from "../../../interfaces/IPoint";
import {RectUtil} from "../../../utils/RectUtil";
import { TextButton } from '../TextButton/TextButton';
import { LabelsSelector } from '../../../store/selectors/LabelsSelector';
import { getUntaggedImages, postTag2Img } from '../../../api/makesense';
import { fetchFileFromUrl } from '../../../utils/imgFileCreator';
import { updateActiveImageIndex, updateImageData } from '../../../store/labels/actionCreators';
import { connect } from 'react-redux';
import {ImageData} from '../../../store/labels/types';
import { ImageDataUtil } from '../../../utils/ImageDataUtil';


interface IProps {
    size: ISize;
    childCount: number;
    childSize: ISize;
    childRender: (index: number, isScrolling: boolean, isVisible: boolean, style: React.CSSProperties) => any;
    overScanHeight?: number;
    updateActiveImageIndex: (activeImageIndex: number) => any;
    updateImageData: (imageData: ImageData[]) => any;
}

interface IState {
    viewportRect: IRect;
    isScrolling: boolean;
    isLoading: boolean;
}

class VirtualList extends React.Component<IProps, IState> {
    private gridSize: ISize;
    private contentSize: ISize;
    private childAnchors: IPoint[];
    private scrollbars: Scrollbars;

    constructor(props) {
        super(props);
        this.state = {
            viewportRect: null,
            isScrolling: false,
            isLoading: false,
        };
    }

    public componentDidMount(): void {
        const {size, childSize, childCount} = this.props;
        console.log(this.props)
        this.calculate(size, childSize, childCount);
        this.setState({
            viewportRect: {
                x: 0,
                y: 0,
                width: this.props.size.width,
                height: this.props.size.height 
            }
        });
    }

    // eslint-disable-next-line react/no-deprecated
    public componentWillUpdate(nextProps: Readonly<IProps>): void {
        const {size, childSize, childCount} = nextProps;
        if (this.props.size.height !== size.height || this.props.size.width !== size.width ||
            this.props.childCount !== childCount) {
            this.calculate(size, childSize, childCount);
            this.setState({
                viewportRect: {
                    x: this.scrollbars.getValues().scrollLeft,
                    y: this.scrollbars.getValues().scrollTop,
                    width: size.width,
                    height: size.height
                }
            });
        }
    }

    private calculate = (size: ISize, childSize: ISize, childCount: number) => {
        this.gridSize = VirtualListUtil.calculateGridSize(size, childSize, childCount);
        this.contentSize = VirtualListUtil.calculateContentSize(size, childSize, this.gridSize);
        this.childAnchors = VirtualListUtil.calculateAnchorPoints(size, childSize, childCount);
    };

    private getVirtualListStyle = ():React.CSSProperties => {
        return {
            position: "relative",
            width: this.props.size.width,
            height: this.props.size.height - 20,
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            alignItems: 'center'
        }
    };

    private getVirtualListContentStyle = ():React.CSSProperties => {
        return {
            width: this.contentSize.width,
            height: this.contentSize.height,
        }
    };

    private onScrollStart = () => {
        this.setState({isScrolling: true});
    };

    private onScrollStop = () => {
        this.setState({isScrolling: false});
    };

    private onScroll = (values) => {
        this.setState({
            viewportRect: {
                x: values.scrollLeft,
                y: values.scrollTop,
                width: this.props.size.width,
                height: this.props.size.height
            }
        });
    };

    private getChildren = () => {
        const {viewportRect, isScrolling} = this.state;
        const {overScanHeight, childSize} = this.props;
        const overScan: number = overScanHeight ? overScanHeight : 0;

        const viewportRectWithOverScan:IRect = {
            x: viewportRect.x,
            y: viewportRect.y - overScan,
            width: viewportRect.width,
            height: viewportRect.height + 2 * overScan
        };

        return this.childAnchors.reduce((children, anchor: IPoint, index: number) => {
            const childRect = Object.assign(anchor, childSize);
            const isVisible = RectUtil.intersect(viewportRectWithOverScan, childRect);

            if (isVisible) {
                const childStyle: React.CSSProperties = {
                    position: "absolute",
                    left: anchor.x,
                    top: anchor.y,
                    width: childSize.width,
                    height: childSize.height
                };

                return children.concat(this.props.childRender(index, isScrolling, isVisible, childStyle))
            }
            else {
                return children;
            }
        }, [])
    };

    
    
    private processImages = async (tagId: string) => {
        this.setState({ isLoading: true });
        try {
            const data = await getUntaggedImages(tagId);
            const files = await Promise.all(data.map(fetchFileFromUrl));

            this.props.updateActiveImageIndex(0);
            this.props.updateImageData(files.map((file:File) => ImageDataUtil
                .createImageDataFromFileData(file, file.name)));
        } catch (error) {
            console.error('Error during image processing:', error);
        } finally {
            this.setState({ isLoading: false });
        }
    };

    // Function to handle Promise.allSettled
    private handlePostImages = async (postImagesArr: Promise<any>[], tagId: string) => {
        this.setState({ isLoading: true });
        try {
            const results = await Promise.allSettled(postImagesArr);

            const failedUploads = results.filter(result => result.status === 'rejected');
            if (failedUploads.length > 0) {
                console.error('Some uploads failed:', failedUploads);
                throw new Error('One or more uploads failed');
            }

            await this.processImages(tagId);
        } catch (error) {
            console.error('Error in handlePostImages:', error);
        } finally {
            this.setState({ isLoading: false });
        }
    };


    private saveChanges = () => {
        const imgsWithLables = LabelsSelector.getImagesData()
        const formatedTags = imgsWithLables.map(img => (
            {
                tagImgId: img.id,
                bboxes: img.labelRects.map(rect => ({
                    tagType: rect.labelId,
                    box: {
                        x_min: rect.rect.x,
                        y_min: rect.rect.y,
                        width: rect.rect.width,
                        height: rect.rect.height
                    }
                }))
            }
        ))

        // Generates promieses arr
        const postImagesArr = formatedTags.map(tag => (
            postTag2Img(tag.tagImgId, {bboxes: tag.bboxes})
        ))

        this.handlePostImages(postImagesArr, '4de315d3-02d7-4e20-bdb5-700c42509b73');
    }

    public render() {
        const displayContent = !!this.props.size && !!this.props.childSize && !!this.gridSize;
        const { isLoading } = this.state;

        return(
            <div
                className="VirtualList"
                style={this.getVirtualListStyle()}
            >
                <Scrollbars
                    ref={ref => this.scrollbars = ref}
                    onScrollFrame={this.onScroll}
                    onScrollStart={this.onScrollStart}
                    onScrollStop={this.onScrollStop}
                    autoHide={true}
                >
                    {displayContent && <div
                        className="VirtualListContent"
                        style={this.getVirtualListContentStyle()}
                    >
                        {this.getChildren()}
                    </div>}
                </Scrollbars>
                <TextButton
                    label={isLoading ? 'Processing...' : 'Save & Next Batch'}
                    onClick={() => !isLoading && this.saveChanges()}
                    style={{ color: 'white', boxShadow: 'white 0 0 0 2px inset', width: 'fit-content', alignSelf: 'center' }}
                />
            </div>
        )
    }
}

const mapDispatchToProps = {
    updateActiveImageIndex,
    updateImageData,
};

export default connect(null, mapDispatchToProps)(VirtualList);
