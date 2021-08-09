import fs from 'fs';

export const storeFeedtoJson = (feed: any) => {
    const path = process.cwd() + '/jobs.json';
    const writer = fs.createWriteStream(path);
    writer.write(JSON.stringify(feed));
}