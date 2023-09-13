import { useState, useEffect } from 'react'
import ArticleCard from '../../components/ArticleCard/ArticleCard'
import WeatherStats from '../../components/WeatherStats/WeatherStats'


export default function HomePage({ user, setUser, newsArticles, setNewsArticles, currentArticle, setCurrentArticle, loading, setLoading, weatherStats, weatherLoading, isNavOpen, showSaved }) {

    useEffect(() => {
        (async () => {
            const apiKey = process.env.REACT_APP_NEWS_API_KEY
            const apiUrl = "https://api.mediastack.com/v1/news"

            try {
                let response
                if (user?.settings?.homePageUrl) {
                    response = await fetch(user.settings.homePageUrl)
                } else {
                    response = await fetch(`${apiUrl}?access_key=${apiKey}&sources=cnn`)
                }

                if (!response.ok) throw new Error(`API request failed with status: ${response.status}`)

                const data = await response.json()

                setNewsArticles(data.data)
            } catch (error) {
                throw new Error(`API request failed with status: ${error}`)
            }
        })()
    }, [])

    const articles = newsArticles.map((article, key) => <ArticleCard key={key} article={article} setCurrentArticle={setCurrentArticle} loading={loading} setLoading={setLoading} user={user} setUser={setUser} showSaved={showSaved} />)

    const city = user?.settings?.locationInfo?.cityName

    const state = user?.settings?.locationInfo?.stateName


    return (
        <div className='w-full p-8'>
            {
                loading 
                ?
                // will show a preview of the article
                // while text loads
                <>
                <p className='text-2xl'>please wait... loading...</p>
                <ArticleCard article={currentArticle.preview} setCurrentArticle={setCurrentArticle} loading={loading} setLoading={setLoading} user={user} setUser={setUser} showSaved={false} />
                </>
                :
                <>
                {user?.settings?.locationInfo?.zipcodeKey ? <WeatherStats weatherStats={weatherStats} weatherLoading={weatherLoading} city={city} state={state} /> : ""}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4'>
                    {articles}
                </div>
                </>
            }
        </div>
    )
}