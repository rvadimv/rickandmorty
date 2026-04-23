import s from './EmptyState.module.scss'

type Props = {
  message: string
}

export const EmptyState = ({ message }: Props) => {
  return (
    <div className={s.root}>
      <p className={s.message}>{message}</p>
    </div>
  )
}
