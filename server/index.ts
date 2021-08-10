import express from 'express';
import cors from 'cors';
import jobRouter from './routes';
import morgan from 'morgan';

const app = express();

// handle CORS issues
app.use(cors());

// Log incoming requests
app.use(morgan("tiny"));

// Parse the request body, so that query params can be extracted.
app.use(express.json());

app.use("/v1/jobs", jobRouter);

app.listen(4000, () => {
    console.log("Server is running on Port 4000");
})