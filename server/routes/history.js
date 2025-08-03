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
        if (originalImages.images.length == filteredImages.images.length) {
            res.status(200).json({
                originals: originalImages.images,
                filtered: filteredImages.images,
                hasMore: filteredImages.hasMore
            });
        } else {
            res.status(500).json({
                error: "There was an issue with your images. Your originals and filtered images do not match. Try refreshing the page."
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "There was a issue getting your images"
    });
    }

});

export default router