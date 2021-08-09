import express from 'express';
import cors from 'cors';
import jobRouter from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use("/v1/jobs", jobRouter);

app.listen(4000, () => {
    console.log("Server is running on Port 4000");
})