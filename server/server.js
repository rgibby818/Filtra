import express from 'express'
import cors from 'cors'
import upload from './routes/upload.js'
import history from './routes/history.js'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()
const PORT = process.env.PORT || 3000

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const vueDistPath = path.resolve(__dirname, '../client/dist')

app.use(cors())
app.use('/upload', upload)
app.use('/history', history)

app.use(express.static(vueDistPath))

app.get('/', (req, res) => {
  res.sendFile(path.join(vueDistPath, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
  console.log(`Vue app being served on ${vueDistPath}`)
  console.log(`Navigate in your browser to: http://localhost:${PORT}`)
})
