import {
  useGetCharacterQuery,
  useGetEpisodesByIdsQuery,
} from '@/entities/character/api/characterApi'
import { useLocation, useNavigate, useParams, type Location } from 'react-router-dom'
import { LoadingState } from '@/shared/ui/loading-state/LoadingState'
import { apiError, isNotFoundError } from '@/shared/lib/apiError'
import { EmptyState } from '@/shared/ui/empty-state/EmptyState'
import { ErrorState } from '@/shared/ui/error-state/ErrorState'

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

  if (!id) {
    return <EmptyState message="No character found" />
  }
  if (isLoading) {
    return <LoadingState message="Loading character..." />
  }
  if (isNotFoundError(error)) {
    return <EmptyState message="No character found" />
  }
  if (error) {
    return <ErrorState message={apiError(error, 'Failed to load character')} />
  }
  if (!data) {
    return <EmptyState message="No character found" />
  }

  return (
    <section>
      <button onClick={handleBack}>Back</button>
      <img src={data.image} alt={data.name} />
      <p>{data.name}</p>
      <p>{data.location.name}</p>
      <p>{data.status}</p>
      <p>{data.origin.name}</p>
      <p>{data.gender}</p>
      <p>{data.species}</p>
      <p>{data.created}</p>
      <p>{data.type || 'Unknown type'}</p>
      <p>
        First seen in:{' '}
        {isEpisodesFetching
          ? 'Loading episode...'
          : episodesError
            ? 'Unknown episode'
            : (firstEpisode?.name ?? 'Unknown episode')}
      </p>
      <h2>Episodes</h2>

      {isEpisodesFetching && <p>Loading episodes...</p>}

      {episodesError && !isEpisodesFetching && <p>Failed to load episodes</p>}

      {!isEpisodesFetching && !episodesError && episodes.length > 0 && (
        <ul>
          {episodes.map(episode => (
            <li key={episode.id}>
              {episode.episode} — {episode.name}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
