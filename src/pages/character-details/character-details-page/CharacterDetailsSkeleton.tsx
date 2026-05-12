import s from './CharacterDetailsSkeleton.module.scss'

const skeletonEpisodes = Array.from({ length: 6 }, (_, index) => index)
const skeletonRows = Array.from({ length: 7 }, (_, index) => index)

export const CharacterDetailsSkeleton = () => {
  return (
    <section className={s.page}>
      <div className={s.back} />

      <article className={s.card}>
        <div className={s.image} />

        <div className={s.content}>
          <div className={s.title} />

          <div className={s.infoGrid}>
            {skeletonRows.map(item => (
              <div key={item} className={s.row}>
                <div className={s.label} />
                <div className={s.value} />
              </div>
            ))}
          </div>
        </div>
      </article>

      <section className={s.episodes}>
        <div className={s.episodesTitle} />

        <div className={s.episodeList}>
          {skeletonEpisodes.map(item => (
            <div key={item} className={s.episodeItem}>
              <div className={s.episodeCode} />
              <div className={s.episodeName} />
              <div className={s.episodeDate} />
            </div>
          ))}
        </div>
      </section>
    </section>
  )
}
