import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service'

import './App.css';
import NavBar from '../../components/NavBar/NavBar'
import AuthPage from '../AuthPage/AuthPage'
import SearchPage from '../SearchPage/SearchPage'
import WeatherPage from '../WeatherPage/WeatherPage'
import HomePage from '../HomePage/HomePage'
import SearchDetailsPage from '../SearchDetailsPage/SearchDetailsPage'
import SavedPage from '../SavedPage/SavedPage'
import SavedDetailsPage from '../SavedDetailsPage/SavedDetailsPage'
import SettingsPage from '../SettingsPage/SettingsPage'

export default function App() {

  const [user, setUser] = useState(getUser())
  const [currentArticle, setCurrentArticle] = useState({})

  return (
    <main className="App">
      { user ?
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            {/* Route components in here */}
            <Route path="/" element={ <HomePage setCurrentArticle={setCurrentArticle} /> } />
            <Route path="/weather" element={ <WeatherPage /> } />
            <Route path="/search" element={ <SearchPage /> } />
            <Route path="/search/:articleName" element={ <SearchDetailsPage currentArticle={currentArticle} /> } />
            <Route path="/saved" element={ <SavedPage /> } />
            <Route path="/saved/:articleName" element={ <SavedDetailsPage /> } />
            <Route path="/settings" element={ <SettingsPage /> } />
          </Routes>

        </>
          :
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route path="/" element={ <HomePage setCurrentArticle={setCurrentArticle} /> } />
            <Route path="/auth" element={ <AuthPage setUser={setUser} /> } />
          </Routes>
        </>
      }

    </main>
  );
}