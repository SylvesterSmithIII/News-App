import { useState } from 'react'
import SearchResults from '../../components/SearchResults/SearchResults'

const formFields = {
  sources: ['cnn', 'bbc'],
  categories: ['general', 'business', 'sports', 'entertainment', 'health', 'science', 'technology'],
  languages: ['en', 'es', 'de', 'ar', 'fr'],
  sort: ['published_desc', 'popularity'],
}

export default function SearchPage({ newsArticles, setNewsArticles, setCurrentArticle }) {
  
  const [formData, setFormData] = useState({
    sources: [],
    categories: [],
    countires: [],
    languages: [],
    keywords: [],
    date: [],
    sort: [],
    limit: [25],
  })

  const [inputValues, setInputValues] = useState({
    keywords: '',
    date: ''
  })



  function handleChange(evt) {
    const { name, value } = evt.target;

      if (name === 'keywords' || name === 'date') {
        setInputValues({ ...inputValues, [name]: value})
      } else {
        // check if the value is already in the array
        if (!formData[name].includes(value)) {
          const newFormData = { ...formData, [name]: [...formData[name], value] };
          setFormData(newFormData);
        }
      }
  }

  function handleSubmit(evt) {
    evt.preventDefault()

    const { name } = evt.target

    console.log(name)

    if (name === 'keywords' || name === 'date') {

      const inputValue = inputValues[name]
      console.log(inputValue)
      if (inputValue) {
        console.log("here")
        const updatedFormData = { ...formData, [name]: [...formData[name], inputValue] }
        setFormData(updatedFormData)

        setInputValues({ ...inputValues, [name]: '' })
      }
    }
  }

  function handleClick(evt) {
    const name = evt.target.name;
    const value = evt.target.value;
  
    const updatedFormData = {
      ...formData,
      [name]: formData[name].filter(param => param !== value)
    };
  
    setFormData(updatedFormData);
  }

  function handleLoadMore() {



    setFormData({
      ...formData,
      limit: formData.limit[0] + 25
    })
  }


  // test to see which are in formData state
  // to render option disabled or not

  return (
      <div>
        <form name='form'>
          <select name="sources" id="" onChange={handleChange}>
            <option value="" disabled selected>Select a Source!</option>
            {formFields.sources.map((source, idx) => (
              <option
                key={idx}
                value={source}
                disabled={ formData.sources.includes(source) }
              >
              {source}
              </option>
            ))}
          </select>
          <select name="categories" id="" onChange={handleChange}>
          <option value="" disabled selected>Select a Category!</option>
            {formFields.categories.map((categorie, idx) => (
              <option
                key={idx}
                value={categorie}
                disabled={ formData.categories.includes(categorie) }
              >
              {categorie}
              </option>
            ))}
          </select>
          <select name="languages" id="" onChange={handleChange}>
          <option value="" disabled selected>Select a language!</option>
            {formFields.languages.map((language, idx) => (
              <option
                key={idx}
                value={language}
                disabled={ formData.languages.includes(language) }
              >
              {language}
              </option>
            ))}
          </select>
          <select name="sort" id="" onChange={handleChange}>
          <option value="" disabled selected>Select a Sorting Option!</option>
            <option value="published_desc">Published Descending</option>
            <option value="popularity">Popularity</option>
          </select>
          <label htmlFor="keywords">Search With Key Words:</label>
          <input type="text" name='keywords' value={inputValues.keywords} onChange={handleChange} />
          <button name='keywords' onClick={handleSubmit}>Add</button>
          <label htmlFor="date">Add a Date or a Date Range! ex: YYYY-MM-DD or 2023-03-20 2023-03-25 for a range!</label>
          <input type="text" name='date' value={inputValues.date} onChange={handleChange} />
          <button name='date' onClick={handleSubmit}>Add</button>
        </form>

        {formData.sources.map((source, idx) => <button key={idx} name='sources' value={source} onClick={handleClick}>{source}</button>)}
        {formData.categories.map((categorie, idx) => <button key={idx} name='categories' value={categorie} onClick={handleClick}>{categorie}</button>)}
        {formData.countires.map((countire, idx) => <button key={idx} name='countires' value={countire} onClick={handleClick}>{countire}</button>)}
        {formData.date.map((d, idx) => <button key={idx} name='date' value={d} onClick={handleClick}>{d}</button>)}
        {formData.keywords.map((keyword, idx) => <button key={idx} name='keywords' value={keyword} onClick={handleClick}>{keyword}</button>)}
        {formData.sort.map((s, idx) => <button key={idx} name='sort' value={s} onClick={handleClick}>{s}</button>)}

        <SearchResults newsArticles={newsArticles} setNewsArticles={setNewsArticles} setCurrentArticle={setCurrentArticle} formData={formData} />

        <button onClick={handleLoadMore}>Load More</button>
      </div>
    );
  }