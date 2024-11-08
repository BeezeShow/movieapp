import { useEffect, useState } from 'react'

import { Card } from './components/Card'
import './App.css'
import { Container } from './components/Container'
import { getMovies } from './utils/getmovies.js'

import { Tabs, Input } from 'antd'
function App() {
  const [movies, setMovies] = useState([])
  // const [query, setQuery] = useState('')
  useEffect(() => {
    getMovies()
      .then((res) => {
        console.log(res)
        setMovies(res.results.slice(0, 6))
      })
      .catch((err) => console.error(err))
  }, [])

  return (
    <div className="App">
      <Container>
        <Tabs
          defaultActiveKey="1"
          items={[
            { key: '1', label: 'Search' },
            { key: '2', label: 'Rated' },
          ]}
        />
        <Input placeholder="Search" />
        <div className="cardGrid">
          {movies?.map((m) => {
            return <Card movie={m} key={m.id} />
          })}
        </div>
      </Container>
    </div>
  )
}

export default App
