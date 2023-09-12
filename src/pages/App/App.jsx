import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service'

import NavBar from '../../components/NavBar/NavBar'
import AuthPage from '../AuthPage/AuthPage'
import SearchPage from '../SearchPage/SearchPage'
import WeatherPage from '../WeatherPage/WeatherPage'
import HomePage from '../HomePage/HomePage'
import FullArticlePage from '../FullArticlePage/FullArticlePage'
import SavedPage from '../SavedPage/SavedPage'
import SavedDetailsPage from '../SavedDetailsPage/SavedDetailsPage'
import SettingsPage from '../SettingsPage/SettingsPage'
import { getForecast } from '../../utilities/general-function';

export default function App() {

  const [user, setUser] = useState(null)
  const [currentArticle, setCurrentArticle] = useState({})
  const [newsArticles, setNewsArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [weatherStats, setWeatherStats] = useState([])
  const [weatherLoading, setWeatherLoading] = useState(true)
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const userInfo = await getUser()
      setUser(userInfo)
    })()
  }, [])

  useEffect(() => {
      (async () => {
        await getWeatherStats()
      })()
  }, [user])


  async function getWeatherStats() {
    if (user?.settings?.locationInfo?.zipcodeKey) {
      // const data = await getForecast(user.settings.zipcodeKey)
      const data = []
      setWeatherStats(data)
      setWeatherLoading(false)
    }
  }

  return (
    <div className="flex flex-col md:flex-row lg:flex-row font-Josefin">
      { user ?
        <>
          <NavBar user={user} setUser={setUser} isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
          <Routes>
            {/* Route components in here */}
            <Route path="/" element={ <HomePage user={user} setUser={setUser} newsArticles={newsArticles} setNewsArticles={setNewsArticles} currentArticle={currentArticle} setCurrentArticle={setCurrentArticle} loading={loading} setLoading={setLoading} weatherStats={weatherStats} weatherLoading={weatherLoading} isNavOpen={isNavOpen} showSaved={true} /> } />
            <Route path="/weather" element={ <WeatherPage weatherStats={weatherStats} /> } />
            <Route path="/search" element={ <SearchPage currentArticle={currentArticle} newsArticles={newsArticles} setNewsArticles={setNewsArticles} setCurrentArticle={setCurrentArticle} loading={loading} setLoading={setLoading} use={user} /> } />
            <Route path="/search/:articleName" element={ <FullArticlePage currentArticle={currentArticle} /> } />
            <Route path="/saved" element={ <SavedPage user={user} setUser={setUser} setCurrentArticle={setCurrentArticle} loading={loading} setLoading={setLoading} /> } />
            <Route path="/saved/:articleName" element={ <SavedDetailsPage /> } />
            <Route path="/settings" element={ <SettingsPage user={user} setUser={setUser} /> } />
          </Routes>
        </>
          :
        <>
          <NavBar user={user} setUser={setUser} isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
          <Routes>
            <Route path="/" element={ <HomePage user={user} setUser={setUser} newsArticles={newsArticles} setNewsArticles={setNewsArticles} currentArticle={currentArticle} setCurrentArticle={setCurrentArticle} loading={loading} setLoading={setLoading} weatherStats={weatherStats} weatherLoading={weatherLoading} isNavOpen={isNavOpen} showSaved={false} /> } />
            <Route path="/auth" element={ <AuthPage setUser={setUser} /> } />
          </Routes>
        </>
      }

    </div>
  );
}