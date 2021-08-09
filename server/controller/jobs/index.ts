import { Request, Response, NextFunction } from "express";
import fs from 'fs';

export const initiateQuery = (_req: Request, res: Response, next: NextFunction) => {
    res.json({ message: "Request is being processed and results will be available shortly." });
    next();
}

export const getAllJobs = (_: Request, res: Response) => {

    const path = process.cwd() + '/jobs.json';

    try {
        if (fs.existsSync(path)) {
            console.log("File exists.")
            const data = fs.readFileSync(path);
            res.json(JSON.parse(data.toString()));
        } else {
            console.log("File does not exist.")
        }
    } catch (err) {
        console.error(err)
    }
}