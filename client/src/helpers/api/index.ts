export const queryForJobs = async () => {
    const response = await fetch("http://localhost:8080/search?query=javascript", {
        method: "POST"
    });
    return response.json();
}

export const getJobs = async (id: string) => {
    const response = await fetch(`http://localhost:8080/result/${id}`);
    return response.json();
}