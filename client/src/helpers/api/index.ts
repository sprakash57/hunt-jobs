import { BASE_URL } from "../../constants";

export const triggerSearch = async ({ query = "", location = "" }: { query?: string, location?: string }) => {
    const response = await fetch(`${BASE_URL}/search?query=${query}&location=${location}`);
    return response.json();
}

export const pollingResults = async () => {
    const response = await fetch(`${BASE_URL}/results`);
    return response.json();
}