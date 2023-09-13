const puppeteer = require('puppeteer')


module.exports = {
    cnn,
}


async function cnn(req, res) {

    try {
        const browser = await puppeteer.launch({
            headless: "new"
        })
        const page = await browser.newPage()
        await page.goto(req.query.url)
    
        const text = await page.$$eval('.paragraph', (paragraphElements) => {
            return paragraphElements.map(pargraphs => pargraphs.textContent)
        })
    
    
        await page.close()
        await browser.close()
        
        res.json(text)
    } catch (error) {
        console.log(error)
        res.json([])
    }

    
}
