import s from './CharacterDetailsSkeleton.module.scss'

export const CharacterDetailsSkeleton = () => {
  return (
    <section className={s.page} aria-hidden="true">
      <div className={s.back} />

      <article className={s.card}>
        <div className={s.image} />

        <div className={s.content}>
          <div className={s.title} />

          <div className={s.meta}>
            {Array.from({ length: 7 }, (_, index) => (
              <div className={s.item} key={index}>
                <div className={s.label} />
                <div className={s.value} />
              </div>
            ))}
          </div>
        </div>
      </article>

      <div className={s.episodesTitle} />

      <div className={s.episodes}>
        {Array.from({ length: 6 }, (_, index) => (
          <div className={s.episode} key={index} />
        ))}
      </div>
    </section>
  )
}
