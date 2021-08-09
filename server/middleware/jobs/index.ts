import axios from "axios";
import fs from 'fs';
import { transform } from "camaro";
import { Request, Response } from "express";

export const fetchJobs = async (req: Request, res: Response) => {
    try {
        const { location, query } = req.query;
        const params: string[] = [];
        if (location) params.push(`l=${location}`);
        if (query) params.push(`q=${query}`);
        const { data } = await axios.get(`http://stackoverflow.com/jobs/feed${params.length ? `?${params.join("&")}` : ""}`);

        const feed = await transform(data, {
            jobs: [
                '/rss/channel/item',
                {
                    "id": 'guid',
                    "title": 'title',
                    "company": 'a10:author',
                    "publishedDate": 'pubDate',
                    "description": 'description',
                    "location": 'location'
                }
            ]
        });
        // Write top 10 records at a time into json file.
        const latestJobs = feed.jobs.slice(0, 10);
        const path = process.cwd() + '/jobs.json';
        fs.writeFileSync(path, JSON.stringify(latestJobs));
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", status: 500 });
    }
}