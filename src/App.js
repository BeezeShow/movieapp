import {  useEffect,  useState } from 'react'


import './App.css'
import { Container } from './components/Container'
import { getGenres, createSession } from './utils/getmovies.js'

import { Tabs } from 'antd'

import { SearchPage } from './components/SearchPage'
import { AppContext } from './Context/AppContext'
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
      .catch((err) => console.error(err))
    createSession().then((res) => {setSession(res.guest_session_id)}).catch((err) => {console.log(err)})
  }, [])
  return (
    <AppContext.Provider value={{ genres, session }}>
      <div className="App">
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
        </Container>
      </div>
    </AppContext.Provider>
  )
}

export default App
