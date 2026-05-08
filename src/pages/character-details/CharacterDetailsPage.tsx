import {
  useGetCharacterQuery,
  useGetEpisodesByIdsQuery,
} from '@/entities/character/api/characterApi'
import { useLocation, useNavigate, useParams, type Location } from 'react-router-dom'
import { apiError, isNotFoundError } from '@/shared/lib/apiError'
import { EmptyState } from '@/shared/ui/empty-state/EmptyState'
import { ErrorState } from '@/shared/ui/error-state/ErrorState'
import { CharacterDetailsSkeleton } from '@/pages/character-details/character-details-page/CharacterDetailsSkeleton'

import s from './CharacterDetailsPage.module.scss'

type LocationState = {
  from?: Location
}

export const CharacterDetailsPage = () => {
  const { id } = useParams()

  const { data, isLoading, error } = useGetCharacterQuery(id ?? '', {
    skip: !id,
  })

  const episodeIds = data?.episode
    .map(url => url.split('/').at(-1))
    .filter((episodeId): episodeId is string => Boolean(episodeId))
    .join(',')

  const {
    data: episodes = [],
    isFetching: isEpisodesFetching,
    error: episodesError,
  } = useGetEpisodesByIdsQuery(episodeIds ?? '', {
    skip: !episodeIds,
  })

  const firstEpisode = episodes[0]

  const location = useLocation() as Location<LocationState>
  const navigate = useNavigate()

  const handleBack = () => {
    const from = location.state?.from
    if (from) {
      navigate(`${from.pathname}${from.search}`)
    } else {
      navigate('/characters')
    }
  }

  const isInitialPageLoading =
    isLoading || (Boolean(episodeIds) && isEpisodesFetching && episodes.length === 0)

  if (!id) {
    return <EmptyState message="No character found" />
  }
  if (isNotFoundError(error)) {
    return <EmptyState message="No character found" />
  }
  if (error) {
    return <ErrorState message={apiError(error, 'Failed to load character')} />
  }
  if (isInitialPageLoading) {
    return <CharacterDetailsSkeleton />
  }
  if (!data) {
    return <EmptyState message="No character found" />
  }

  return (
    <section className={s.page}>
      <button className={s.back} type="button" onClick={handleBack}>
        ← Back
      </button>
      <article className={s.card}>
        <img className={s.img} src={data.image} alt={data.name} />
        <div className={s.content}>
          <h1 className={s.name}>{data.name}</h1>
          <div className={s.meta}>
            <p className={s.item}>
              <span className={s.label}>Status: </span>
              {data.status}
            </p>

            <p className={s.item}>
              <span className={s.label}>Species: </span>
              {data.species}
            </p>

            <p className={s.item}>
              <span className={s.label}>Gender: </span>
              {data.gender}
            </p>

            <p className={s.item}>
              <span className={s.label}>Type: </span>
              {data.type || 'Unknown type'}
            </p>

            <p className={s.item}>
              <span className={s.label}>Last known location: </span>
              {data.location.name}
            </p>

            <p className={s.item}>
              <span className={s.label}>Origin: </span>
              {data.origin.name}
            </p>

            <p className={s.item}>
              <span className={s.label}>First seen in: </span>
              {isEpisodesFetching
                ? 'Loading episode...'
                : episodesError
                  ? 'Unknown episode'
                  : (firstEpisode?.name ?? 'Unknown episode')}
            </p>
          </div>
        </div>
      </article>
      <section className={s.episodes}>
        <h2 className={s.episodesTitle}>Episodes</h2>

        {isEpisodesFetching && <p>Loading episodes...</p>}

        {episodesError && !isEpisodesFetching && <p>Failed to load episodes</p>}

        {!isEpisodesFetching && !episodesError && episodes.length > 0 && (
          <ul className={s.episodeList}>
            {episodes.map(episode => (
              <li key={episode.id} className={s.episodeItem}>
                {episode.episode} - {episode.name} - {episode.air_date}
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  )
}
