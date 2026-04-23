import s from './LoadingState.module.scss'

type Props = {
  message?: string
}

export const LoadingState = ({ message = 'Loading...' }: Props) => {
  return (
    <div className={s.root}>
      <p className={s.message}>{message}</p>
    </div>
  )
}
