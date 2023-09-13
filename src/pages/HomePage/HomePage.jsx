import { useEffect } from 'react'
import ArticleCard from '../../components/ArticleCard/ArticleCard'
import WeatherStats from '../../components/WeatherStats/WeatherStats'
import { getNews } from '../../utilities/general-function'


export default function HomePage({ user, setUser, newsArticles, setNewsArticles, currentArticle, setCurrentArticle, loading, setLoading, weatherStats, weatherLoading, isNavOpen, showSaved, allowLink = true }) {


    // on load set current articles 
    useEffect(() => {
        (async () => {
            const fetchedArticles = await getNews(user?.settings?.homePageUrl)
            setNewsArticles(fetchedArticles)
           
        })()
    }, [])

    const articles = newsArticles.map((article, key) => <ArticleCard key={key} article={article} setCurrentArticle={setCurrentArticle} loading={loading} setLoading={setLoading} user={user} setUser={setUser} showSaved={showSaved} allowLink={allowLink} />)

    const city = user?.settings?.locationInfo?.cityName

    const state = user?.settings?.locationInfo?.stateName

    const hasNoArticles = newsArticles.length ? false : true


    return (
        <div className='w-full p-8'>
            {
                // if waiting for web scraping api call
                loading 
                ?
                <>
                <p className='text-2xl'>please wait... loading...</p>
                <ArticleCard article={currentArticle.preview} setCurrentArticle={setCurrentArticle} loading={loading} setLoading={setLoading} user={user} setUser={setUser} showSaved={false} allowLink={allowLink} />
                </>
                :
                <>
                {user?.settings?.locationInfo?.zipcodeKey ? <WeatherStats weatherStats={weatherStats} weatherLoading={weatherLoading} city={city} state={state} /> : ""}
                {
                    hasNoArticles
                    ?
                    <p className='text-2xl text-center'>Couldn't find any articles! Try a different search</p>
                    :
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4'>
                    {articles}
                    </div>
                }
                </>
            }
        </div>
    )
}