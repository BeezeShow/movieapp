import cls from './Card.module.css'
import { format } from 'date-fns'
import { Tag, Rate } from 'antd'
import { Rating } from '../Rating'
import { useContext } from 'react'
import { AppContext } from '../../Context/AppContext'
import { addRating } from '../../utils/getmovies'

export const Card = ({ movie, genres }) => {
  const appContext = useContext(AppContext)
  const url = 'https://image.tmdb.org/t/p/original' + movie.poster_path

  const addRatingToApi = (rating) => {
    addRating(appContext.session, movie.id, rating).then((r)=>{console.log(r)}).catch((err) => {})
  }

  return (
    <div className={cls.container}>
      <div className={cls.leftSide} style={{ backgroundImage: `url("${url}")` }}></div>
      <div className={cls.rightSide}>
        <Rating voteValue={movie.vote_average}/>
        <h5 className={cls.h5Class}>{movie.title}</h5>
        <div className={cls.releaseDate}>{format(movie.release_date || new Date(), 'MMMM d, y')}</div>
        <div className={cls.genre}>
          {movie.genre_ids.slice(0, 2).map((id) => (
            <Tag key={id}>{appContext.genres?.[id]}</Tag>
          ))}
        </div>
        <div className={cls.overview}>{movie.overview}</div>
        <div className={cls.stars}>
          <Rate onChange={(r)=>{addRatingToApi(r)}} count={10} style={{ fontSize: 16 }} allowHalf defaultValue={0} />
        </div>
      </div>
    </div>
  )
}
