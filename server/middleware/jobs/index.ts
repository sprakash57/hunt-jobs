import axios from "axios";
import { transform } from "camaro";
import { Request, Response } from "express";
import { storeFeedtoJson } from "../../helpers";

export const fetchJobs = async (req: Request, _: Response) => {
    try {
        const { location, query } = req.body;
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
                    "companyName": 'a10:author',
                    "publishedDate": 'pubDate',
                    "typeOfJob": 'category',
                    "description": 'description',
                    "location": 'location'
                }
            ]
        });
        storeFeedtoJson(feed.jobs);
    } catch (error) {
        console.log(error);
    }
}