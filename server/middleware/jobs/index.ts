import axios from "axios";
import fs from 'fs';
import { transform } from "camaro";
import { Request, Response } from "express";
import { BASE_URL } from "../../constants";

export const fetchInBackground = async (req: Request, res: Response) => {
    try {
        const filePath = `${process.cwd()}/jobs.json`
        // Delete storage file if already exist.
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        const { location, query } = req.query;
        const params: string[] = [];
        // Check what params are there in query string. construct it as per the format before using it.
        if (location) params.push(`l=${location}`);
        if (query) params.push(`q=${query}`);
        // Fetch the RSS feed from stackoverflow
        const { data } = await axios.get(`${BASE_URL}${params.length ? `?${params.join("&")}` : ""}`);
        // Convert the XML feed into JSON
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
        const jobs = feed.jobs.slice(0, 10);
        // applied flag will help UI to keep track of jab status
        const jobsWithStatus = jobs.map(job => ({ ...job, applied: false }));
        fs.writeFileSync(filePath, JSON.stringify(jobsWithStatus));
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", status: 500 });
    }
}