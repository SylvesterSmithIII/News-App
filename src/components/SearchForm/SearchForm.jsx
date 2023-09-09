import { useState } from 'react'

const formFields = {
    sources: ['cnn', 'bbc'],
    categories: ['general', 'business', 'sports', 'entertainment', 'health', 'science', 'technology'],
    languages: ['en', 'es', 'de', 'ar', 'fr'],
    sort: ['published_desc', 'popularity'],
  }

export default function SearchForm({ formData, setFormData, wantDate=false }) {

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

    return (
        <form name='form'>
          <select name="sources" id="" defaultValue="disabled" onChange={handleChange}>
            <option value="disabled" disabled>Select a Source!</option>
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
          <select name="categories" id="" defaultValue="disabled" onChange={handleChange}>
          <option value="disabled" disabled>Select a Category!</option>
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
          <select name="languages" id="" defaultValue="disabled" onChange={handleChange}>
          <option value="disabled" disabled>Select a language!</option>
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
          <select name="sort" id="" defaultValue="disabled" onChange={handleChange}>
            <option value="disabled" disabled>Select a Sorting Option!</option>
            <option value="published_desc">Published Descending</option>
            <option value="popularity">Popularity</option>
          </select>
          <label htmlFor="">Search With Key Words:</label>
          <input type="text" name='keywords' value={inputValues.keywords} onChange={handleChange} />
          <button name='keywords' onClick={handleSubmit}>Add</button>
          {wantDate && 
            <>
            <label htmlFor="">Add a Date or a Date Range! ex: YYYY-MM-DD or 2023-03-20 2023-03-25 for a range!</label>
            <input type="text" name='date' value={inputValues.date} onChange={handleChange} />
            <button name='date' onClick={handleSubmit}>Add</button>
            </>
          }
          
        </form>
    )
}