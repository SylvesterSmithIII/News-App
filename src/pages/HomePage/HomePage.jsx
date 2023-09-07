import { useState, useEffect } from 'react'
import ArticleCard from '../../components/ArticleCard/ArticleCard'


export default function HomePage({ setCurrentArticle }) {
    const [newsArticles, setNewsArticles] = useState([])

    useEffect(() => {
        (async () => {
            const apiKey = `${process.env.NEWS_API_KEY}`
            const apiUrl = "https://api.mediastack.com/v1/news"

            try {
                const response = await fetch(`${apiUrl}?access_key=${apiKey}&sources=cnn`)

                if (!response.ok) throw new Error(`API request failed with status: ${response.status}`)

                const data = await response.json()

                console.log(data)

                setNewsArticles(data.data)
            } catch (error) {
                
            }
        })()
    }, [])

    const articles = newsArticles.map((article, key) => <ArticleCard key={key} article={article} setCurrentArticle={setCurrentArticle} />)

    return (
        <div>
            {articles}
        </div>
    )
}