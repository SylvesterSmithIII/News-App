import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service'

import './App.css';
import NavBar from '../../components/NavBar/NavBar'
import AuthPage from '../AuthPage/AuthPage'
import SearchPage from '../SearchPage/SearchPage'
import WeatherPage from '../WeatherPage/WeatherPage'
import HomePage from '../HomePage/HomePage'
import FullArticlePage from '../FullArticlePage/FullArticlePage'
import SavedPage from '../SavedPage/SavedPage'
import SavedDetailsPage from '../SavedDetailsPage/SavedDetailsPage'
import SettingsPage from '../SettingsPage/SettingsPage'

export default function App() {

  const [user, setUser] = useState(getUser())
  console.log(user)
  const [currentArticle, setCurrentArticle] = useState({})
  const [newsArticles, setNewsArticles] = useState([])
  const [loading, setLoading] = useState(false)

  return (
    <main className="App">
      { user ?
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            {/* Route components in here */}
            <Route path="/" element={ <HomePage newsArticles={newsArticles} setNewsArticles={setNewsArticles} currentArticle={currentArticle} setCurrentArticle={setCurrentArticle} loading={loading} setLoading={setLoading} /> } />
            <Route path="/weather" element={ <WeatherPage /> } />
            <Route path="/search" element={ <SearchPage newsArticles={newsArticles} setNewsArticles={setNewsArticles} setCurrentArticle={setCurrentArticle} /> } />
            <Route path="/search/:articleName" element={ <FullArticlePage currentArticle={currentArticle} /> } />
            <Route path="/saved" element={ <SavedPage /> } />
            <Route path="/saved/:articleName" element={ <SavedDetailsPage /> } />
            <Route path="/settings" element={ <SettingsPage user={user} setUser={setUser} /> } />
          </Routes>

        </>
          :
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route path="/" element={ <HomePage newsArticles={newsArticles} setNewsArticles={setNewsArticles} currentArticle={currentArticle} setCurrentArticle={setCurrentArticle} loading={loading} setLoading={setLoading} /> } />
            <Route path="/auth" element={ <AuthPage setUser={setUser} /> } />
          </Routes>
        </>
      }

    </main>
  );
}