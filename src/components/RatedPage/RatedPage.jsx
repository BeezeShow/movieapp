import { useEffect, useState, useContext } from 'react'
import { Pagination, Skeleton } from '@mui/material'

import { AppContext } from '../../Context/AppContext'
import { Card } from '../Card'
import { PlaceHolder } from '../PlaceHolder'
import { getRatedMovies } from '../../utils/getmovies'

export const RatedPage = () => {
  const { session } = useContext(AppContext)
  const [ratedMovies, setRatedMovies] = useState([])
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  // Функция для загрузки оцененных фильмов
  const loadRatedMovies = (page) => {
    if (!session) return
    setIsLoading(true)
    getRatedMovies(session, page)
      .then((res) => {
        setRatedMovies(res.results)
        setTotalPage(res.total_pages)
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    loadRatedMovies(page)
  }, [page, session])

  return (
    <>
      {isLoading ? (
        <div className="cardGrid">
          {Array.from({ length: 6 }).map((_, idx) => (
            <Skeleton key={idx} height={281} />
          ))}
        </div>
      ) : ratedMovies.length ? (
        <div className="cardGrid">
          {ratedMovies.map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <PlaceHolder text="У вас нет оцененных фильмов" />
      )}
      <Pagination count={totalPage} page={page} onChange={(_, newPage) => setPage(newPage)} disabled={isLoading} />
    </>
  )
}
