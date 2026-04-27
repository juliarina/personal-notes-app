import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddPage from './pages/AddPage';
import ArchivesPage from './pages/ArchivesPage';
import DetailPage from './pages/DetailPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { putAccessToken, getAccessToken, getUserLogged } from './utils/network-data';
import ThemeContext from './context/ThemeContext';
import Navigation from './components/Navigation';
import LocaleContext from './context/LocaleContext';
import useTwoOptionContext from './hooks/useTwoOptionContext'

function App() {
  const [ authedUser, setAuthedUser ] = useState(null);
  const [ initializing, setInitializing ] = useState(true);
  const [ theme, toggleTheme, themeContextValue ] = useTwoOptionContext("theme", "dark", "light");
  const [ locale, toggleLocale, localeContextValue] = useTwoOptionContext("locale", "id", "en");

  const onLoginSuccess = async ({ accessToken }) => {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    setAuthedUser(data);
  };

  const onLogOut = () => {
    setAuthedUser(null);
    putAccessToken("");
  };

  useEffect(() => {
    async function getUserData() {
      const { data } = await getUserLogged()
      setAuthedUser(data);
      setInitializing(false);
    }
    
    const accessToken = getAccessToken();
    accessToken === '' ? setInitializing(false) : getUserData();
  }, []);

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <LocaleContext.Provider value={localeContextValue}>  
        <div className="app-container" data-theme={theme}>
          <header>
            <h1><Link to="/">{ locale === "id"? "Aplikasi Catatan" : "Notes App" }</Link></h1>
            <Navigation user={authedUser} logout={onLogOut} />
          </header>
          { (!initializing) &&
            <main>
              {  
                (authedUser === null) ? 
                <Routes>
                  <Route path='*' element={<LoginPage loginSuccess={onLoginSuccess} />}></Route>
                  <Route path='/register' element={<RegisterPage />}></Route>
                </Routes>

                :

                <Routes>
                  <Route path='*' element={<NotFoundPage />}></Route>
                  <Route path='/' element={<HomePage />} />
                  <Route path='/notes/new' element={<AddPage />}/>
                  <Route path='/archives' element={<ArchivesPage />}></Route>
                  <Route path='/notes/:id' element={<DetailPage />}/>
                </Routes>     
              }   
            </main>
          }
        </div>
      </LocaleContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
