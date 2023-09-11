export default function FullArticlePage({ currentArticle }) {

    return (
        <div className="w-full p-8">
            <h1 className="text-2xl md:text-2xl lg:text-2xl text-center my-2 font-bold">{currentArticle.preview.title}</h1>
            {currentArticle.preview.author && (
                <p className="text-gray-500 text-sm">By: {currentArticle.preview.author}</p>
            )}
            <a
              href={currentArticle.preview.url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 hover:underline block mt-2"
            >
              Go To Article!
            </a>
            { currentArticle.preview.image && <img src={currentArticle.preview.image} alt="this articles cover" className="mb-4 mx-auto"></img>}
            {currentArticle.text.map((p, idx) => {
                return <div key={idx}>
                    <p>{p}</p>
                    <br  />
                </div>
            })}
        </div>
    )
}