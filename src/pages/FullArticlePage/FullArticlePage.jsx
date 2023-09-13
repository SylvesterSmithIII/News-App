export default function FullArticlePage({ currentArticle }) {

    let hasText = false
    if (currentArticle.text.length) hasText = true

    return (
        <div className="w-full p-8">
            <h1 className="text-2xl md:text-2xl lg:text-2xl text-center my-2 font-bold">{currentArticle.preview.title}</h1>
            {currentArticle.preview.author && (
                <p className="text-gray-500 text-sm">By: {currentArticle.preview.author}</p>
            )}
            { hasText 
                &&
                <a
                    href={currentArticle.preview.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500 hover:underline block mt-2"
                >
                    Go To Article!
                </a>
            }
            
            { currentArticle.preview.image && <img src={currentArticle.preview.image} alt="this articles cover" className="aspect-auto mx-auto"></img>}
            {
                hasText ?
                currentArticle.text.map((p, idx) => {
                    return (
                        <div key={idx}>
                            <p>{p}</p>
                            <br  />
                        </div>
                    )
                })
                :
                <div className="flex flex-col text-center mt-6">

                    <p className="text-2xl">Couldn't get the text from the Article! </p>
                    <a
                        href={currentArticle.preview.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-500 hover:underline block mt-2"
                    >
                    Go To Article!
                    </a>
                </div>
                
            }
        </div>
    )
}