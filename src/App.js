import { useEffect, useState } from 'react'

import { Card } from './components/Card'
import './App.css'
import { Container } from './components/Container'
import { getGenres, getMovies } from './utils/getmovies.js'

import { Tabs, Input, Pagination } from 'antd'
function App() {
  const [movies, setMovies] = useState([])
  // const [query, setQuery] = useState('')
  const [genres, setGenres] = useState({})
  const [page, setPage] = useState(1)
  const[totalPage, setTotalPage] = useState(1)
  useEffect(() => {
    getMovies()
      .then((res) => {
        console.log(res)
        setMovies(res.results.slice(0, 6))
      })
      .catch((err) => console.error(err))
  }, [])
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
            return <Card movie={m} key={m.id} genres={genres} />
          })}
        </div>
        <Pagination current={page} total={totalPage} />
      </Container>
    </div>
  )
}

export default App
