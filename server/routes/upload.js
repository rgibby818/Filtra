import express from 'express'
import multer from 'multer'
import applyImageFilter from '../helper/filter.js'
import fs from 'fs'

const router = express.Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync('uploads/')) {
      fs.mkdirSync('uploads/', { recursive: true })
    }
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split('.').pop()
    const filename = `${Date.now()}-${file.originalname}`
    cb(null, filename)
  },
})

const upload = multer({ storage })
const supportedFiles = ['image/jpg', 'image/jpeg', 'image/png']

router.post('/', upload.single('image'), async (req, res) => {
  const file = req.file
  const filter = req.body.option

  const deleteFile = (filePath) => {
    fs.unlink(filePath, (error) => {
      if (error) {
        console.error(`Unable to delete ${filePath}`);
      }
    })
  }

  try {
    if (file.mimetype.split('/')[0] !== 'image') {
      deleteFile(file.path);
      return res.status(415).json({ message: 'File is not an Image' })
    }
    if (!file) {
      deleteFile(file.path);
      return res.status(400).json({ message: 'No image was uploaded' })
    }
    if (!supportedFiles.includes(file.mimetype.toLowerCase())) {
      deleteFile(file.path)
      return res.status(415).json({ message: 'File is valid format' })
    }
    const filterImage = await applyImageFilter(file.path, filter)
    const mimetype = file.mimetype

    fs.readFile(filterImage.filePath, (error, data) => {
      if (error) {
        return res.status(500).json({ message: 'Unable to read image file' })
      }
      const base64Image = Buffer.from(data).toString('base64')

      res.json({
        image: base64Image,
        name: filterImage.fileName,
        mimetype: file.mimetype,
      })
    })
  } catch (error) {
    if (file) {
      deleteFile(file.path);
    }
    if (filter === 'removebg') {
      return res
        .status(500)
        .json({
          message: 'Error on removing background. Is your apyhub.com api key in a .env file?',
        })
    } else {
      return res.status(500).json({ message: `Error on processing image: ${error}` })
    }
  }
})

export default router
