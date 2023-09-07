import { useState } from 'react'

const formFields = {
  sources: ['cnn', 'bbc'],
  categories: ['general', 'buisiness', 'sports', 'entertainment', 'health', 'science', 'technology'],
  languages: ['en', 'es', 'de', 'ar', 'fr'],
  sort: ['published_desc', 'popularity'],
}

export default function SearchPage() {
  
  const [formData, setFormData] = useState({
    sources: [],
    categories: [],
    countires: [],
    languages: [],
    keywords: [],
    date: [],
    sort: [],
    limit: [],
  })

  function handleChange(evt) {
    const { name, value } = evt.target;

    // check if the value is already in the array
    if (!formData[name].includes(value) || value === "") {
      const newFormData = { ...formData, [name]: [...formData[name], value] };
     setFormData(newFormData);
    }
  }

  function handleSubmit() {
    return 1
  }


  // test to see which are in formData state
  // to render option disabled or not

  return (
      <div>
        <form onSubmit={handleSubmit}>
          <select name="sources" id="" onChange={handleChange}>
            <option value="">Select a Source!</option>
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
          <option value="">Select a Category!</option>
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
          <option value="">Select a language!</option>
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
          <option value="">Select a Sorting Option!</option>
            <option value="published_desc">Published Descending</option>
            <option value="popularity">Popularity</option>
          </select>
        </form>

        <div>
          {formData.sources}
          {formData.categories}
          {formData.countires}
          {formData.date}
          {formData.keywords}
          {formData.languages}
          {formData.limit}
          {formData.sort}
        </div>
      </div>
    );
  }