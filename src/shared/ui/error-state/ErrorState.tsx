import s from './ErrorState.module.scss'

type Props = {
  message: string
}

export const ErrorState = ({ message }: Props) => {
  return (
    <div className={s.root} role="alert">
      <p className={s.message}>{message}</p>
    </div>
  )
}
