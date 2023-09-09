import { useEffect } from 'react'
import ArticleCard from '../ArticleCard/ArticleCard'
import * as URLMaker from '../../utilities/scrappers/url-maker'

export default function SearchResults({ newsArticles, setNewsArticles, setCurrentArticle, formData }) {

    useEffect(() => {
        fetchData()
    }, [formData])
    
    async function fetchData() {
        const url = await URLMaker.createSearchURL(formData)
        const data = await URLMaker.makeApiCall(url)
        console.log(data)
        setNewsArticles(data.data)
    }

    const articles = newsArticles.map((article, key) => <ArticleCard key={key} article={article} setCurrentArticle={setCurrentArticle} />)

    return (
        <div>
            {articles}
        </div>
    )
}