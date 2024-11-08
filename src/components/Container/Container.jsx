import cls from './Container.module.css'

export const Container = ({ children }) => {
  return <div className={cls.wrapper}>{children}</div>
}
