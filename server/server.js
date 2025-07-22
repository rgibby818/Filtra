import express from 'express';
import cors from 'cors';
import uploadRoutes from './routes/uploadRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000

app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

app.use('/upload', uploadRoutes);

app.get('/ping', (request, response) => {
    response.send("pong");
})