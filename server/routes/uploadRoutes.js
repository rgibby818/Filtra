import express from 'express';
import multer from 'multer';
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.post('/', upload.single('image'), (req, res) => {
    console.log(req);
    if(!req.file) {
        return res.status(400).json({ message: 'No image was uploaded'});
    }

    const imageBuffer = req.file.buffer;
    
    // TODO: process Image and return its content
    console.log("image is being processed");
    res.json({ message: 'Image is processed'});
})

export default router;