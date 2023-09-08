import { cnnScrapper } from "../../utilities/scrapper-service"
import { useNavigate } from 'react-router-dom';

export default function ArticleCard({ article, setCurrentArticle, loading, setLoading }) {

    const navigate = useNavigate()

    async function handleClick() {
        setCurrentArticle({
            preview: article,
            text: ""
        })
        setLoading(true)

        const text = await cnnScrapper(article.url)
        setLoading(false)

        setCurrentArticle({
            preview: article,
            text: text
        })
        navigate(`/search/${article.title}`)
    }

    return (

        <div>
            <h1 onClick={loading ? undefined : handleClick}>{article.title}</h1>
            <p dangerouslySetInnerHTML={{ __html: article.description }}></p>
            {!loading && <a href={article.url} target="_blank" rel="noreferrer">Go To Article!</a>}
            { article.image && <img src={article.image} alt="this articles cover"></img>}
        </div>
    )
}