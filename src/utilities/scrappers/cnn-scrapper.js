const puppeteer = require('puppeteer')

export default async function cnnScrapper(URL) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(URL)

    const text = await page.$$eval('.paragraph', (paragraphElements) => {
        return paragraphElements.map(pargraphs => pargraphs.textContent)
    })

    await browser.close()
    
    return text
}