import express, { Request, Response } from 'express';
const app = express();

app.get("/", (_: Request, res: Response) => {
    res.json({ message: "Hello world" });
})

app.listen(4000, () => {
    console.log("Server is running on Port 4000");
})