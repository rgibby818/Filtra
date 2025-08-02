import express from 'express';
import fs from 'fs';
import path from 'path';
import getImages from '../helper/image-history.js'
import e from 'express';

const router = express.Router();
const originalImagesPath = path.resolve('uploads/');
const filteredImagesPath = path.resolve('uploads-filtered/');

router.post('/', async (req, res) => {
    const { start, end } = req.headers;

    if (!start || !end) {
        console.warn("Invalid request: Missing headers")
        res.status(400).json({
            error: "Missing one or both headers: 'start' and 'end'"
        });
    }
    try {
        const originalImages = await getImages(originalImagesPath, start, end);
        const filteredImages = await getImages(filteredImagesPath, start, end);
        res.status(200).json({
            originals: originalImages.images,
            filtered: filteredImages.images,
            hasMore: filteredImages.hasMore
        });

    } catch (error) {
        console.log(error);
        res.status(500).send('Failed to get images');
    }

});

export default router