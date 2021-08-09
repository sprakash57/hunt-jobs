export const queryForJobs = async () => {
    const response = await fetch("http://localhost:4000/v1/jobs/search?q=javascript");
    return response.json();
}

export const getJobs = async () => {
    const response = await fetch(`http://localhost:4000/v1/jobs/results`);
    return response.json();
}