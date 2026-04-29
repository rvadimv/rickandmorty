import { useGetCharacterQuery } from '@/entities/character/api/characterApi'
import { useNavigate, useParams } from 'react-router-dom'
import { LoadingState } from '@/shared/ui/loading-state/LoadingState'
import { apiError, isNotFoundError } from '@/shared/lib/apiError'
import { EmptyState } from '@/shared/ui/empty-state/EmptyState'
import { ErrorState } from '@/shared/ui/error-state/ErrorState'

export const CharacterDetailsPage = () => {
  const { id } = useParams()

  const { data, isLoading, error } = useGetCharacterQuery(id ?? '', {
    skip: !id,
  })

  const navigate = useNavigate()

  if (!id) {
    return <EmptyState message="No character found" />
  }

  if (isLoading) return <LoadingState message="Loading character..." />
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
    <div>
      <button onClick={() => navigate('/characters')}>Back</button>
      <img src={data.image} alt={data.name} />
      <p>{data.name}</p>
      <p>{data.location.name}</p>
      <p>{data.status}</p>
      <p>{data.origin.name}</p>
      <p>{data.gender}</p>
      <p>{data.species}</p>
      <p>{data.created}</p>
      <p>{data.type}</p>
    </div>
  )
}
