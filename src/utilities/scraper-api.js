import sendRequest from "./send-get-request";
const BASE_URL = '/api/scraper'

export function scrapeWebsite(URL) {
    return sendRequest(`${BASE_URL}/cnn`, URL)
}