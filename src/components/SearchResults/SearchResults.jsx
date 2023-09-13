import { useEffect } from 'react'
import ArticleCard from '../ArticleCard/ArticleCard'
import * as URLMaker from '../../utilities/scrapers/url-maker'

export default function SearchResults({ currentArticle, newsArticles, setNewsArticles, setCurrentArticle, formData, loading, setLoading, user, setUser }) {

    useEffect(() => {
        fetchData()
    }, [formData])
    
    async function fetchData() {
        const url = URLMaker.createSearchURL(formData)
        const data = await URLMaker.makeApiCall(url)
        setNewsArticles(data.data)
    }


    const articles = newsArticles.map((article, key) => <ArticleCard key={key} article={article} setCurrentArticle={setCurrentArticle} loading={loading} setLoading={setLoading} showSaved={true} user={user} setUser={setUser} />)



    return (
        <>
        
        {
            loading 
            ?
            // will show a preview of the article
            // while text loads
            <>
            <p className='text-2xl'>please wait... loading...</p>
            <ArticleCard article={currentArticle.preview} setCurrentArticle={setCurrentArticle} user={user} setUser={setUser} loading={loading} setLoading={setLoading} showSaved={false} />
            </>
            :
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4'>
                {articles}
            </div>
        }
        </>
    )
}