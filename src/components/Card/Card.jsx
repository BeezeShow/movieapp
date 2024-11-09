import cls from './Card.module.css'
import { format } from 'date-fns'
import { Tag, Rate } from 'antd'


export const Card = ({ movie, genres }) => {
  console.log(movie.overview)
  return (
    <div className={cls.container}>
      <div className={cls.leftSide}></div>
      <div className={cls.rightSide}>
        <h5 className={cls.h5Class}>{movie.title}</h5>
        <div className={cls.releaseDate}>{format(movie.release_date, 'MMMM d, y')}</div>
        <div className={cls.genre}>{movie.genre_ids.slice(0,2).map(id => <Tag key={id}>{genres[id]}</Tag>)}</div>
        <div className={cls.overview}>{movie.overview}</div>
        <div className={cls.stars}><Rate count={10} style={{fontSize: 16}} allowHalf defaultValue={2.5} /></div>
      </div>
    </div>
  )
}
