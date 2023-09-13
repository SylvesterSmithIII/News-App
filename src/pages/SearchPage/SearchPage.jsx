import { useState } from 'react'
import SearchResults from '../../components/SearchResults/SearchResults'
import SearchForm from '../../components/SearchForm/SearchForm'
import SelectedFormFields from '../../components/SelectedFormFields/SelectedFormFields'


export default function SearchPage({ newsArticles, setNewsArticles, currentArticle, setCurrentArticle, loading, setLoading, user, setUser }) {
  
  const [formData, setFormData] = useState({
    sources: [],
    categories: [],
    languages: [],
    keywords: [],
    date: [],
    sort: [],
    limit: [25]
  })

  // NOT WORKING
  function handleLoadMore() {
    setFormData({
      ...formData,
      limit: [formData.limit[0] + 25]
    })
  }

  const hasNoArticles = newsArticles.length ? false : true


  return (
      <div className='w-full p-8'>
        <h1 className="text-2xl font-bold mb-4 text-center">Search Page</h1>
        
        <SearchForm formData={formData} setFormData={setFormData} wantDate={true} />

        <SelectedFormFields formData={formData} setFormData={setFormData} />

        <SearchResults newsArticles={newsArticles} setNewsArticles={setNewsArticles} setCurrentArticle={setCurrentArticle} currentArticle={currentArticle} formData={formData} loading={loading} setLoading={setLoading} user={user} setUser={setUser} />

        {
          hasNoArticles
          ?
          <></>
          :
          formData.limit[0] === 100 ? "" : <button onClick={handleLoadMore} className='text-2xl font-bold block my-4 hover:text-blue-500 transition duration-300 ease-in-out mx-auto'>Load More Articles</button>
        }
        
      </div>
    );
  }