import { useGetCharactersQuery } from '@/entities/character/api/characterApi'

export const CharactersPage = () => {
  const { data, isLoading, error } = useGetCharactersQuery(1)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error</div>

  return (
    <div>
      <h1>Characters</h1>

      {data?.results.map(char => (
        <div key={char.id}>{char.name}</div>
      ))}
    </div>
  )
}
