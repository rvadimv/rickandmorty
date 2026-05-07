import s from './EmptyState.module.scss'

type Props = {
  message: string
  actionText?: string
  onAction?: () => void
}

export const EmptyState = ({ message, actionText, onAction }: Props) => {
  return (
    <div className={s.root}>
      <p className={s.message}>{message}</p>
      {actionText && onAction && (
        <button type="button" onClick={onAction} className={s.button}>
          {actionText}
        </button>
      )}
    </div>
  )
}
