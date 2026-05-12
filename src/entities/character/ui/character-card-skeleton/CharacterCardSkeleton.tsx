import s from './CharacterCardSkeleton.module.scss'

export const CharacterCardSkeleton = () => {
  return (
    <article className={s.card} aria-hidden="true">
      <div className={s.image} />

      <div className={s.content}>
        <div className={s.title} />
        <div className={s.lineShort} />
        <div className={s.block} />
        <div className={s.block} />
        <div className={s.gapBlock} />
        <div className={s.block} />
        <div className={s.block} />
      </div>
    </article>
  )
}
