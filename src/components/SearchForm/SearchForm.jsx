import { useState } from 'react';

const formFields = {
  sources: ['cnn', 'bbc'],
  categories: ['general', 'business', 'sports', 'entertainment', 'health', 'science', 'technology'],
  languages: ['en', 'es', 'de', 'ar', 'fr'],
  sort: ['published_desc', 'popularity'],
};

export default function SearchForm({ formData, setFormData, wantDate = false }) {
  const [inputValues, setInputValues] = useState({
    keywords: '',
    date: '',
  });

  function handleChange(evt) {
    const { name, value } = evt.target;

    if (name === 'keywords' || name === 'date') {
      setInputValues({ ...inputValues, [name]: value });
    } else {
      // check if the value is already in the array
      if (!formData[name].includes(value)) {
        const newFormData = { ...formData, [name]: [...formData[name], value] };
        setFormData(newFormData);
      }
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    const { name } = evt.target;

    console.log(name);

    if (name === 'keywords' || name === 'date') {
      const inputValue = inputValues[name];
      console.log(inputValue);
      if (inputValue) {
        console.log('here');
        const updatedFormData = { ...formData, [name]: [...formData[name], inputValue] };
        setFormData(updatedFormData);

        setInputValues({ ...inputValues, [name]: '' });
      }
    }
  }

  return (
    <form name="form">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div>
          <select
            name="sources"
            id="sources"
            defaultValue="disabled"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:shadow-outline"
          >
            <option value="disabled" disabled>
              Select a Source!
            </option>
            {formFields.sources.map((source, idx) => (
              <option
                key={idx}
                value={source}
                disabled={formData.sources.includes(source)}
              >
                {source}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select
            name="categories"
            id="categories"
            defaultValue="disabled"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:shadow-outline"
          >
            <option value="disabled" disabled>
              Select a Category!
            </option>
            {formFields.categories.map((categorie, idx) => (
              <option
                key={idx}
                value={categorie}
                disabled={formData.categories.includes(categorie)}
              >
                {categorie}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select
            name="languages"
            id="languages"
            defaultValue="disabled"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:shadow-outline"
          >
            <option value="disabled" disabled>
              Select a Language!
            </option>
            {formFields.languages.map((language, idx) => (
              <option
                key={idx}
                value={language}
                disabled={formData.languages.includes(language)}
              >
                {language}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select
            name="sort"
            id="sort"
            defaultValue="disabled"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:shadow-outline"
          >
            <option value="disabled" disabled>
              Select a Sorting Option!
            </option>
            <option value="published_desc">Published Descending</option>
            <option value="popularity">Popularity</option>
          </select>
        </div>
      </div>

      <div className="my-4">
        <input
          type="text"
          name="keywords"
          value={inputValues.keywords}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:shadow-outline"
          placeholder="Enter Keyword"
        />
        <button
          name="keywords"
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
        >
          Add Keyword
        </button>
      </div>

      {wantDate && (
        <div className="mb-4">
          <input
            type="text"
            name="date"
            value={inputValues.date}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:shadow-outline"
            placeholder="YYYY-MM-DD or Date Range"
          />
          <button
            name="date"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
          >
            Add Date
          </button>
        </div>
      )}
    </form>
  );
}
