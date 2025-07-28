import express from "express"
import multer from "multer"
import applyImageFilter from "../helper/filter.js"


const router = express.Router()
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const ext = file.originalname.split('.').pop();
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename);
    }
});
const upload = multer( {storage} );


router.post('/', upload.single('image'), async (req, res) => {

    const file = req.file;
    const filter = req.body.option;
    const option = req.body.option;

    if(!file.mimetype.split("/")[0] === 'image') {
        return res.status(415).json({ message: "File is not an Image"});
    }
    if (!file) {
      return res.status(400).json({ message: 'No image was uploaded' })
    }

    const filterImage = await applyImageFilter(file.path, filter);

    res.sendFile(filterImage.filePath, (error) => {
        if (error) {
            console.log("Error Processing Image");
            res.status(500).send("Error sending image.");
        }
    })
})

export default router
