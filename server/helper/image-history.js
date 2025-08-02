import fs from 'fs/promises';
import path from 'path';

export default async function getImages(directoryPath, start, end) {
    start = parseInt(start);
    end = parseInt(end);
    if (isNaN(start) || isNaN(end)) {
        throw new Error("start/end must be whole numbers");
    }

    try {
        const files = await fs.readdir(directoryPath);
        const filesInRange = files.slice(start, end);
        const hasMore = files.length > end;

        const images = await Promise.all(
            filesInRange.map(async (fileName) => {
                const filePath = path.join(directoryPath, fileName);
                const fileData = (await fs.readFile(filePath)).toString('base64');
                return {
                    fileName,
                    blob: fileData, // Buffer
                };
            })
        );

        return {
            images,
            hasMore,
        };

    } catch (error) {
        console.error(`Error reading directory path at ${directoryPath}`);
        console.error(error);
        throw error;
    }
}

