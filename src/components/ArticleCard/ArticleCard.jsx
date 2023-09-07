import { cnnScrapper } from "../../utilities/scrapper-service"
import { useNavigate } from 'react-router-dom';

export default function ArticleCard({ article, setCurrentArticle }) {

    const navigate = useNavigate()

    async function handleClick() {
        const text = await cnnScrapper(article.url)

        setCurrentArticle({
            preview: article,
            text: text
        })
        navigate(`/search/${article.title}`)
    }

    return (

        <div>
            <h1 onClick={handleClick}>{article.title}</h1>
            <p dangerouslySetInnerHTML={{ __html: article.description }}></p>
            <a href={article.url} target="_blank" rel="noreferrer">Go To Article!</a>
            { article.image && <img src={article.image} alt="this articles cover"></img>}
        </div>
    )
}