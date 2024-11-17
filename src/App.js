import { useEffect, useState } from 'react'
import './App.css'
import { Tabs } from 'antd'
import { ToastContainer, toast } from 'react-toastify'

import { Container } from './components/Container'
import { getGenres, createSession } from './utils/getmovies.js'
import { RatedPage } from './components/RatedPage' // Импорт RatedPage
import { SearchPage } from './components/SearchPage'
import { AppContext } from './Context/AppContext'

import 'react-toastify/dist/ReactToastify.css'

function App() {
  const [genres, setGenres] = useState({})
  const [activeTab, setActiveTab] = useState('1')
  const [session, setSession] = useState(null)
  //получение списка жанров
  useEffect(() => {
    getGenres()
      .then((res) => {
        console.log(res)
        const result = {}
        res.genres.forEach((genre) => {
          result[genre.id] = genre.name
        })
        setGenres(result)
      })
      .catch((err) => {
        toast.error('ошибка при получении списка жанров')
        console.error(err)
      })
    const localSession = checkLocalSession()
    if (!localSession) {
      createSession()
        .then((res) => {
          setSession(res.guest_session_id)
          window.localStorage.setItem('session', JSON.stringify(res))
          window.localStorage.setItem('ratings', JSON.stringify({  }))
        })
        .catch((err) => {
          toast.error('ошибка при создании сессии')
          console.log(err)
        })
    } else {
      setSession(localSession.guest_session_id)
    }
  }, [])

  const checkLocalSession = () => {
    let session = window.localStorage.getItem('session')
    if (!session) return false
    else {
      const expired = JSON.parse(session).expires_at
      if (new Date().getTime() > new Date(expired).getTime()) return false
    }

    return JSON.parse(session)
  }

  return (
    <AppContext.Provider value={{ genres, session }}>
      <div className="App">
        <ToastContainer />
        <Container>
          <Tabs
            onTabClick={(key) => setActiveTab(key)}
            defaultActiveKey="1"
            items={[
              { key: '1', label: 'Search' },
              { key: '2', label: 'Rated' },
            ]}
          />
          {activeTab === '1' && <SearchPage />}
          {activeTab === '2' && <RatedPage />} {/* Компонент RatedPage */}
        </Container>
      </div>
    </AppContext.Provider>
  )
}

export default App
