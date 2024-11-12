import cls from './Rating.module.css'

export const Rating = ({ voteValue }) => {
  const value = voteValue.toFixed(1)
  const defineColor = () => {
    if (voteValue >= 0 && voteValue < 3) {
      return '#E90000'
    }
    if (voteValue >= 3 && voteValue < 5) {
      return '#E97E00'
    }
    if (voteValue >= 5 && voteValue < 7) {
      return '#E9D100'
    }
    if (voteValue >= 7 && voteValue <= 10) {
      return '#66E900'
    }

  }

  const color = `2px solid ${defineColor()}`
  const style = {
    border:  color
  }

  return (
    <div className={cls.circles} style={style}>
      <div className={cls.value}>{value}</div>
    </div>
  )
}
