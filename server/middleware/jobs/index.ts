import axios from "axios";
import fs from 'fs';
import { transform } from "camaro";
import { Request } from "express";
import { BASE_URL, RESULT_SCHEMA } from "../../constants";

export const fetchInBackground = async (req: Request) => {
    try {
        const params: string[] = [];
        const { location, query } = req.query;

        //Path where temporary json has been stored.
        const filePath = `${process.cwd()}/jobs.json`;

        // Delete storage file if already exist.
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

        // Construct url with query params coming from UI.
        if (location) params.push(`l=${location}`);
        if (query) params.push(`q=${query}`);

        // Fetch the RSS feed from stackoverflow
        const { data } = await axios.get(`${BASE_URL}${params.length ? `?${params.join("&")}` : ""}`);

        // Convert the XML feed into JSON
        const feed = await transform(data, {
            jobs: ['/rss/channel/item', RESULT_SCHEMA]
        });

        // Write top 10 records at a time into json file.
        const jobs = feed.jobs.slice(0, 10);

        // applied flag will help UI to keep track of jab status
        const jobsWithStatus = jobs.map(job => ({ ...job, applied: false }));
        fs.writeFileSync(filePath, JSON.stringify(jobsWithStatus));
    } catch (error) {
        // These logs are meant to keep it here, just to check the health status of stackoverflow rss feed.
        console.info("----> Background job failed due to: ", error.message, " <----");
        console.info("Stackoverflow RSS feed could be an issue, Check it here https://stackoverflow.com/jobs/feed");
    }
}