import { cnnscraper } from "../../utilities/scraper-service"
import { useNavigate } from 'react-router-dom';
import { saveArticle, deleteArticle } from "../../utilities/users-api";

export default function ArticleCard({ article, setCurrentArticle, user, setUser, loading, setLoading, showSaved }) {

    const navigate = useNavigate()

    async function handleClick() {
        setCurrentArticle({
            preview: article,
            text: ""
        })
        setLoading(true)

        const text = await cnnscraper(article.url)
        setLoading(false)

        setCurrentArticle({
            preview: article,
            text: text
        })
        navigate(`/search/${article.title}`)
    }

    async function handleSubmit() {
        const newUserData =  await saveArticle({
            author: article.author,
            title: article.title,
            description: article.description,
            url: article.url,
            image: article.image
        })

        localStorage.setItem('token', newUserData.token)
        setUser(newUserData.user)
    }

    async function handleDelete() {

        const newUserData =  await deleteArticle({ description: article.description })

        localStorage.setItem('token', newUserData.token)
        setUser(newUserData.user)
    }

    const isSaved = user?.savedArticles?.some(savedArticle => savedArticle?.url === article?.url)

    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-lg p-4">
          <h1
            onClick={loading ? undefined : handleClick}
            className="text-2xl text-center my-2 font-bold"
          >
            {article.title}
          </h1>
          {article.author && (
            <p className="text-gray-500 text-sm">By: {article.author}</p>
          )}
          <p className="text-gray-700" dangerouslySetInnerHTML={{__html: article.description}}></p>
          {!loading && (
            <a
              href={article.url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 hover:underline block mt-2"
            >
              Go To Article!
            </a>
          )}
          {article.image && (
            <div className="aspect-auto">
            <img
              src={article.image}
              alt="Article Cover"
              className="mx-auto"
            />
          </div>
          )}
          {showSaved && (
          
          !isSaved ? (
            <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600"
            >
              Save this article for later
            </button>
            </div>
          ) : (
            <div className="flex justify-center">
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 mt-4 rounded hover:bg-red-600"
            >
              Remove this saved Article
            </button>
            </div>
          )
          )}
        </div>
      )
      
}