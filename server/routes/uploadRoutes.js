import express from 'express';
import multer from 'multer';
import fs from 'fs';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ dest: 'upload/' });


router.post('/', upload.single('image'), (req, res) => {
    const image = req.file;
    console.log(image);
    const option = req.body.option;

    if(!image) {
        return res.status(400).json({ message: 'No image was uploaded'});
    }
    
    // TODO: process Image and return its content
    console.log("image is being processed");
    res.json({ message: 'Image is processed'});
})

export default router;