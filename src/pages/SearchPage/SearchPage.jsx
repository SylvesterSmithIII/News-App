import { useState } from 'react'
import SearchResults from '../../components/SearchResults/SearchResults'
import SearchForm from '../../components/SearchForm/SearchForm'
import SelectedFormFields from '../../components/SelectedFormFields/SelectedFormFields'


export default function SearchPage({ newsArticles, setNewsArticles, setCurrentArticle, loading, setLoading }) {
  
  const [formData, setFormData] = useState({
    sources: [],
    categories: [],
    languages: [],
    keywords: [],
    date: [],
    sort: [],
  })

  // NOT WORKING
  function handleLoadMore() {
    setFormData({
      ...formData,
      limit: formData.limit[0] + 25
    })
  }


  // test to see which are in formData state
  // to render option disabled or not

  return (
      <div className='w-full p-8'>
        
        <SearchForm formData={formData} setFormData={setFormData} wantDate={true} />

        <SelectedFormFields formData={formData} setFormData={setFormData} />

        <SearchResults newsArticles={newsArticles} setNewsArticles={setNewsArticles} setCurrentArticle={setCurrentArticle} formData={formData} loading={loading} setLoading={setLoading} />

        <button onClick={handleLoadMore}>Load More</button>
      </div>
    );
  }