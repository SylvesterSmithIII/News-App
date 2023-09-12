import * as scraperAPI from './scraper-api'

export async function cnnscraper(URL) {
    const text = await scraperAPI.scrapeWebsite(URL)
    return text
}