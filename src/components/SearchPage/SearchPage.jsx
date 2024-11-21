import { Input } from 'antd'
import { Pagination, Skeleton } from '@mui/material'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { debounce } from 'lodash-es'
import { toast } from 'react-toastify'

import { Card } from '../Card'
import { PlaceHolder } from '../PlaceHolder'
import { getMovies } from '../../utils/getmovies'

export const SearchPage = () => {
  const [movies, setMovies] = useState([])
  const [query, setQuery] = useState('')

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
      .catch((err) => {
        toast.error('ошибка')
        console.error(err)
      })
      .finally(() => setIsLoading(false))
  }
  const placeHolderText = useMemo(() => {
    if (!movies.length) {
      if (!query) return 'введите поисковый запрос'
      else return 'по данному запросу ничего не найдено'
    } else {
      return ''
    }
  }, [query, movies.length])

  //калбек

  const debounceLoadMovies = useCallback(
    debounce((page, query) => {
      loadMovies(page, query)
    }, 1000),
    []
  )

  // получение списка фильмов//

  useEffect(() => {
    loadMovies(page, query)
  }, [page])

  const handleChangeQuery = (e) => {
    setQuery(e.target.value)
    debounceLoadMovies(page, e.target.value)
  }

  return (
    <>
      <Input placeholder="Search" value={query} onChange={handleChangeQuery} />
      {isLoading ? (
        <div className="cardGrid">
          {Array.from({ length: 6 }).map(() => {
            return <Skeleton height={281} key={Math.random()} />
          })}
        </div>
      ) : movies.length ? (
        <div className="cardGrid">
          {movies?.map((m) => {
            return <Card movie={m} key={m.id} />
          })}
        </div>
      ) : (
        <PlaceHolder text={placeHolderText} />
      )}
      <Pagination disabled={isLoading} paget={page} count={totalPage} onChange={(_, page) => setPage(page)} />
    </>
  )
}
