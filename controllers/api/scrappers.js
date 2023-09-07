const puppeteer = require('puppeteer')


module.exports = {
    cnn,
}


async function cnn(req, res) {
    console.log(req.query.url)


    console.log("thats the req body")
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(req.query.url)

    const text = await page.$$eval('.paragraph', (paragraphElements) => {
        return paragraphElements.map(pargraphs => pargraphs.textContent)
    })

    await browser.close()

    console.log(text)
    
    res.json(text)
}
