import { Request, Response, NextFunction } from "express";
import fs from 'fs';

export const initiateQuery = (_req: Request, res: Response, next: NextFunction) => {
    res.json({ message: "Request is being processed and results will be available shortly.", status: 200 });
    next();
}

export const getAllJobs = (_: Request, res: Response) => {
    try {
        const path = process.cwd() + '/jobs.json';
        if (fs.existsSync(path)) {
            console.log("File exists.")
            const data = fs.readFileSync(path);
            res.json(JSON.parse(data.toString()));
            fs.unlinkSync(path);
        } else {
            res.json({ message: "Loading... Your results will appear here" });
        }
    } catch (err) {
        console.error(err)
    }
}