const puppeteer = require('puppeteer')


module.exports = {
    cnn,
}


async function cnn(req, res) {

    try {
        // launch headless browser
        const browser = await puppeteer.launch({
            headless: "new"
        })

        // create new page and navigate to url
        const page = await browser.newPage()
        await page.goto(req.query.url)
        
        // Extract text from elements with class 'paragraph'
        const text = await page.$$eval('.paragraph', (paragraphElements) => {
            return paragraphElements.map(pargraphs => pargraphs.textContent)
        })
    
        // closse page and browser
        await page.close()
        await browser.close()
        
        // return array of strings
        res.json(text)
    } catch (error) {
        console.log(error)
        // if error in puppeteer or exceeded runtime
        // return empty array
        res.json([])
    }

    
}
