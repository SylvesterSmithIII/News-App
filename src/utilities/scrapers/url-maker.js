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

        params[key].forEach(arr => {
            wholeWord += `${arr},`
        })

        // remove trailing comma
        wholeWord = wholeWord.slice(0, -1)

        searchParams.append(key, wholeWord)

    }

    const fullURL = `${baseURL}?${searchParams.toString()}`

    return fullURL
}

function createHomeURL(user, ) {
    // might move to backend will need to query
    // for user and get their profile preferences
    // and make the api call back there and send the articles over
}