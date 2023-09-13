import ArticleCard from "../../components/ArticleCard/ArticleCard"

export default function SavedPage({ user, setUser, currentArticle, setCurrentArticle, loading, setLoading }) {

    
    const articles = user.savedArticles.map((article, key) => <ArticleCard key={key} article={article} setCurrentArticle={setCurrentArticle} loading={loading} setLoading={setLoading} user={user} setUser={setUser} showSaved={true} />)

    const hasNoArticles = user.savedArticles.length ? false : true

    return (

        <div className='w-full p-8'>

        <h1 className="text-2xl font-bold mb-4 text-center">Saved Articles Page</h1>

        
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
            
            hasNoArticles
            ?
            <p className='text-2xl text-center'>No saved articles! Try saving one!</p>
            :
            <>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4'>
            {articles}
            </div>
            </>
        }
        
        </div>

    )
}