import { useGetCharactersQuery } from '@/entities/character/api/characterApi'
import { CharacterCard } from '@/entities/character/ui/character-card/CharacterCard'

export const CharactersPage = () => {
  const { data, isLoading, error } = useGetCharactersQuery(1)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error</div>

  return (
    <div>
      <h1>Characters</h1>

      {data?.results.map(char => (
        <CharacterCard key={char.id} character={char} />
      ))}
    </div>
  )
}
