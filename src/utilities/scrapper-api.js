import sendRequest from "./send-get-request";
const BASE_URL = '/api/scrapper'

export function scrapeWebsite(URL) {
    return sendRequest(`${BASE_URL}/cnn`, URL)
}