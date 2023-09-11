import { useEffect } from 'react'
import ArticleCard from '../ArticleCard/ArticleCard'
import * as URLMaker from '../../utilities/scrappers/url-maker'

export default function SearchResults({ currentArticle, newsArticles, setNewsArticles, setCurrentArticle, formData, loading, setLoading }) {

    useEffect(() => {
        fetchData()
    }, [formData])
    
    async function fetchData() {
        const url = URLMaker.createSearchURL(formData)
        const data = await URLMaker.makeApiCall(url)
        console.log(data)
        setNewsArticles(data.data)
    }

    console.log(currentArticle)

    const articles = newsArticles.map((article, key) => <ArticleCard key={key} article={article} setCurrentArticle={setCurrentArticle} laoding={loading} setLoading={setLoading} />)

    return (
        <>
        
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
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4'>
                {articles}
            </div>
        }
        </>
    )
}