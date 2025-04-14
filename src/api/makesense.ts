import axios from "axios";

const makesenseURL: string = import.meta.env.VITE_API_MAKESENSE_URL as string;

const sendCredentials = { withCredentials: true };

interface BBox {
    x_min: number;
    y_min: number;
    width: number;
    height: number;
}

interface BBoxWithType {
    box: BBox,
    tagType: string
}

//Querystring: InitDate, endDate
export const getTaggedImages = (missionTypeId: string, queryString: string) =>
    axios.get(`${makesenseURL}/v1/missions/${missionTypeId}/images/tagged?${queryString}`, sendCredentials).then((res) => res.data)

export const getUntaggedImages = (missionTypeId: string) =>
    axios.get(`${makesenseURL}/v1/missions/${missionTypeId}/images/untagged`, sendCredentials).then(res => res.data)

export const getImageById = (missionTypeId: string, imgId: string) =>
    axios.get(`${makesenseURL}/v1/missions/${missionTypeId}/images/${imgId}`, sendCredentials).then(res => res.data)

export const getAllTagsByImgID = (tagImgId: string) =>
    axios.get(`${makesenseURL}/v1/images/${tagImgId}/tags`, sendCredentials).then(res => res.data)

export const postTag2Img = (tagImgId: string, bboxes: { bboxes: BBoxWithType[] }) =>
    axios.post(`${makesenseURL}/v1/images/${tagImgId}/tags`, bboxes, sendCredentials).then(res => res.data)

export const getTagTypeByMissionType = (missionTypeId: string) =>
    axios.get(`${makesenseURL}/v1/missions/types/${missionTypeId}`, sendCredentials).then(res => res.data)

export const getNumberTaggedImagesByUserId = (userId: string) => 
    axios.get(`${makesenseURL}/v1/tagImages?${userId}`, sendCredentials).then(res => res.data)

export const getAllMissionTypes = () =>
    axios.get(`${makesenseURL}/v1/missions/types`, sendCredentials).then(res => res.data)
