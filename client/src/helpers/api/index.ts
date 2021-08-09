export const queryForJobs = async ({ query = "", location = "" }: { query?: string, location?: string }) => {
    const response = await fetch(`http://localhost:4000/v1/jobs/search?query=${query}&location=${location}`);
    return response.json();
}

export const getJobs = async () => {
    const response = await fetch(`http://localhost:4000/v1/jobs/results`);
    return response.json();
}