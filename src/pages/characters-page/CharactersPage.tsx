import { useGetCharactersQuery } from '@/entities/character/api/characterApi'
import { CharacterCard } from '@/entities/character/ui/character-card/CharacterCard'
import { useSearchParams } from 'react-router-dom'
import { LoadingState } from '@/shared/ui/loading-state/LoadingState'
import { ErrorState } from '@/shared/ui/error-state/ErrorState'
import { EmptyState } from '@/shared/ui/empty-state/EmptyState'
import { isNotFoundError, apiError } from '@/shared/lib/apiError.ts'
import { Search } from '@/shared/ui/search/Search'
import { useUrlSearchDraft } from '@/shared/lib/hooks/useUrlSearchDraft'
import { Pagination } from '@/shared/ui/pagination/Pagination'

import s from './CharactersPage.module.scss'

export const CharactersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const name = searchParams.get('name') ?? ''

  const rawPage = searchParams.get('page')
  const parsedPage = Number(rawPage)
  const page = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1

  const { value, onSearch, onValueChange, onKeyDown } = useUrlSearchDraft('name')

  const { data, isLoading, error } = useGetCharactersQuery({ page, name })

  if (isLoading) return <LoadingState message="Loading characters..." />
  if (isNotFoundError(error)) {
    return <EmptyState message="No characters found" />
  }
  if (error) {
    return <ErrorState message={apiError(error, 'Failed to load characters')} />
  }
  if (!data?.results.length) {
    return <EmptyState message="No characters found" />
  }

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', String(newPage))
    setSearchParams(params)
  }

  return (
    <>
      <h1>Characters</h1>

      <Search
        placeholder="Search Characters"
        value={value}
        onSearch={onSearch}
        onValueChange={onValueChange}
        onKeyDown={onKeyDown}
      />

      <div className={s.list}>
        {data.results.map(char => (
          <CharacterCard key={char.id} character={char} />
        ))}
      </div>
      <Pagination totalPages={data.info.pages} currentPage={page} onPageChange={handlePageChange} />
    </>
  )
}
