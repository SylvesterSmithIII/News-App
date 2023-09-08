import { useState, useEffect } from 'react'
import ArticleCard from '../../components/ArticleCard/ArticleCard'


export default function HomePage({ newsArticles, setNewsArticles, currentArticle, setCurrentArticle, loading, setLoading }) {

    useEffect(() => {
        (async () => {
            const apiKey = process.env.REACT_APP_NEWS_API_KEY
            const apiUrl = "https://api.mediastack.com/v1/news"

            try {
                const response = await fetch(`${apiUrl}?access_key=${apiKey}&sources=cnn`)

                if (!response.ok) throw new Error(`API request failed with status: ${response.status}`)

                const data = await response.json()

                console.log(data)

                setNewsArticles(data.data)
            } catch (error) {
                throw new Error(`API request failed with status: ${error}`)
            }
        })()
    }, [])

    const articles = newsArticles.map((article, key) => <ArticleCard key={key} article={article} setCurrentArticle={setCurrentArticle} loading={loading} setLoading={setLoading} />)

    return (
        <div>
            {
                loading 
                ?
                // will show a preview of the article
                // while text loads
                <>
                'please wait... loading...'
                <ArticleCard article={currentArticle.preview} setCurrentArticle={setCurrentArticle} loading={loading} setLoading={setLoading} />
                </>
                :
                articles
                }
        </div>
    )
}