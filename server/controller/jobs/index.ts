import { Request, Response, NextFunction } from "express";
import fs from 'fs';

export const initiateQuery = (_req: Request, res: Response, next: NextFunction) => {
    res.json({ message: "Request is being processed and results will be available shortly.", status: 200 });
    next();
}

export const getSearchedResults = (_: Request, res: Response) => {
    try {
        const path = process.cwd() + '/jobs.json';
        if (fs.existsSync(path)) {
            const data = fs.readFileSync(path);
            res.json(JSON.parse(data.toString()));
        } else {
            res.json([]);
        }
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", status: 500 })
    }
}