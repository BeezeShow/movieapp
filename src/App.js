import { useCallback, useEffect, useState } from 'react'

import { Card } from './components/Card'
import './App.css'
import { Container } from './components/Container'
import { getGenres, getMovies } from './utils/getmovies.js'

import { Tabs, Input } from 'antd'
import { Pagination, Skeleton } from '@mui/material'
import { debounce } from 'lodash-es'

function App() {
  const [movies, setMovies] = useState([])
  const [query, setQuery] = useState('')
  const [genres, setGenres] = useState({})
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const loadMovies = (page, query) => {
    setIsLoading(true)
    getMovies(page, query)
      .then((res) => {
        console.log(res)
        setMovies(res.results.slice(0, 6))
        setTotalPage(res.total_pages)
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false))
  }
  //калбек
  const debounceLoadMovies = useCallback(
    debounce((page, query) => {
      loadMovies(page, query)
    }, 1000)
    ,[])
  // получение списка фильмов//

  useEffect(() => {
    loadMovies(page, query)
  }, [page])

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
  }, [])

  const handleChangeQuery = (e) =>{
    setQuery(e.target.value)
    debounceLoadMovies(page, e.target.value)
  }
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
        <Input placeholder="Search" value={query} onChange={handleChangeQuery} />
        <div className="cardGrid">
          {isLoading
            ? Array.from({ length: 6 }).map(() => {
              return <Skeleton height={281} />
            })
            : movies?.map((m) => {
              return <Card movie={m} key={m.id} genres={genres} />
            })}
        </div>
        <Pagination disabled={isLoading} paget={page} count={totalPage} onChange={(_, page) => setPage(page)} />
      </Container>
    </div>
  )
}

export default App
