import ArticleCard from "../../components/ArticleCard/ArticleCard"

export default function SavedPage({ user, setUser, setCurrentArticle, loading, setLoading }) {

    
    const articles = user.savedArticles.map((article, key) => <ArticleCard key={key} article={article} setCurrentArticle={setCurrentArticle} loading={loading} setLoading={setLoading} user={user} setUser={setUser} showSaved={true} />)


    return (
            <>
            {articles.length
                ?
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 w-full p-8'>
                    {articles}
                </div>
                :
                <p className="text-2xl text-center w-full p-8">No current saved articles!</p>
            }   
            </>
    )
}