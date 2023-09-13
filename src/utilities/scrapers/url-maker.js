export async function makeApiCall(url){
    try {
        const response = await fetch(url)

        if (!response.ok) throw new Error(`API request failed with status: ${response.status}`)

        return response.json()
    } catch (error) {
        throw new Error(`API request failed with status: ${error}`)
    }
}

export function createSearchURL(params) {
    // need to test for each parameter and
    // build the url accordingly. (URL datatype)
    const baseURL = "https://api.mediastack.com/v1/news"
    const apiKey = process.env.REACT_APP_NEWS_API_KEY

    const searchParams = new URLSearchParams();
    searchParams.append("access_key", apiKey)
    
    for (const key in params) {
        if (!params[key].length) continue

        let wholeWord = ""

        if (key === "keywords") {
            params[key].forEach(arr => {
                wholeWord += `${arr}+`
                wholeWord = wholeWord.slice(0, -1)
            })
        } else {
            params[key].forEach(arr => {
                wholeWord += `${arr},`
            })
        }
 
        // remove trailing comma or plus
        wholeWord = wholeWord.slice(0, -1)

        searchParams.append(key, wholeWord)

    }

    const fullURL = `${baseURL}?${searchParams.toString()}`

    return fullURL
}