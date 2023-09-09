import { useState, useEffect } from 'react'
import ArticleCard from '../../components/ArticleCard/ArticleCard'
import WeatherStats from '../../components/WeatherStats/WeatherStats'


export default function HomePage({ user, newsArticles, setNewsArticles, currentArticle, setCurrentArticle, loading, setLoading, weatherStats }) {

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

    console.log(user)
    console.log(weatherStats)

    const articles = newsArticles.map((article, key) => <ArticleCard key={key} article={article} setCurrentArticle={setCurrentArticle} loading={loading} setLoading={setLoading} />)

    return (
        <div>
            {user?.settings?.zipcodeKey ? <WeatherStats weatherStats={weatherStats} /> : ""}
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