import cls from './Card.module.css'

export const Card = ({ movie }) => {
  return (
    <div className={cls.container}>
      <div className={cls.leftSide}></div>
      <div className={cls.rightSide}>{movie.title}</div>
    </div>
  )
}
