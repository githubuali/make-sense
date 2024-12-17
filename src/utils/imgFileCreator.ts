// Helper function to convert signed URL to a File object
export const fetchFileFromUrl = async (file: { id: string, url: string, date: Date }): Promise<File> => {
    try {
        const response = await fetch(file.url);
        const blob = await response.blob();
        const fileName = `Image_${file.id}.jpg`; // Create a file name for this image
        return new File([blob], fileName, { type: blob.type });
    } catch (error) {
        console.error(`Failed to fetch file from URL: ${file.url}`, error);
        throw error;
    }
};