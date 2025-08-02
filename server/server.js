import express from 'express';
import cors from 'cors';
import upload from './routes/upload.js';
import history from './routes/history.js';

const app = express();
const PORT = process.env.PORT || 3000

app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

app.use('/upload', upload);
app.use('/history', history);

app.get('/ping', (request, response) => {
    response.send("pong");
})