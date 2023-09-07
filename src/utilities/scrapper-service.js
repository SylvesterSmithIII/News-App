import * as scrapperAPI from './scrapper-api'

export async function cnnScrapper(URL) {
    const text = await scrapperAPI.scrapeWebsite(URL)
    return text
}