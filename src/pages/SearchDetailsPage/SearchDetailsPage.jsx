export default function SearchDetailsPage({ currentArticle }) {

    return (
        <div>
            <h1>{currentArticle.preview.title}</h1>
            <p>by: {currentArticle.preview.author}</p>
            <a href={currentArticle.preview.url} target="_blank" rel="noreferrer">Go To Article!</a>
            { currentArticle.preview.image && <img src={currentArticle.preview.image} alt="this articles cover"></img>}
            {currentArticle.text.map((p, idx) => {
                return <div key={idx}>
                    <p>{p}</p>
                    <br  />
                </div>
            })}
        </div>
    )
}