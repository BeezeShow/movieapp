import { format } from 'date-fns'
import { Tag, Rate } from 'antd'
import { useContext } from 'react'

import { Rating } from '../Rating'
import { AppContext } from '../../Context/AppContext'
import { addRating } from '../../utils/getmovies'

import cls from './Card.module.css'

export const Card = ({ movie }) => {
  const appContext = useContext(AppContext)
  const url = 'https://image.tmdb.org/t/p/original' + movie.poster_path

  const addRatingToApi = (rating) => {
    addRating(appContext.session, movie.id, rating)
      .then((r) => {
        console.log(r)
        updateLocalRating(rating)
      })
      .catch(() => {})
  }
  const updateLocalRating = (rating) => {
    let ratings = window.localStorage.getItem('ratings')
    if (ratings) {
      ratings = JSON.parse(ratings)
    } else ratings = {}

    let newRatings = { ...ratings, [movie.id]: rating }
    window.localStorage.setItem('ratings', JSON.stringify(newRatings))
  }

  const getLocalRating = () => {
    let ratings = window.localStorage.getItem('ratings')
    if (ratings) {
      ratings = JSON.parse(ratings)
    } else ratings = {}
    return ratings[movie.id]
  }

  return (
    <div className={cls.container}>
      <div className={cls.leftSide} style={{ backgroundImage: `url("${url}")` }}></div>
      <div className={cls.rightSide}>
        <Rating voteValue={movie.vote_average} />
        <div className={cls.header}>
          <div className={cls.mobileImg} style={{ backgroundImage: `url("${url}")` }}></div>
          <div>
            <h5 className={cls.h5Class}>{movie.title}</h5>
            <div className={cls.releaseDate}>{format(movie.release_date || new Date(), 'MMMM d, y')}</div>
            <div className={cls.genre}>
              {movie.genre_ids.slice(0, 2).map((id) => (
                <Tag key={id}>{appContext.genres?.[id]}</Tag>
              ))}
            </div>
          </div>
        </div>
        <div className={cls.overview}>{movie.overview}</div>
        <div className={cls.stars}>
          <Rate
            onChange={(r) => {
              addRatingToApi(r)
            }}
            count={10}
            style={{ fontSize: 16 }}
            allowHalf
            defaultValue={movie.rating || getLocalRating() || 0}
          />
        </div>
      </div>
    </div>
  )
}
