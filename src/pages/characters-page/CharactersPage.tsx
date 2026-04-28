import { useGetCharactersQuery } from '@/entities/character/api/characterApi'
import { CharacterCard } from '@/entities/character/ui/character-card/CharacterCard'
import { useSearchParams } from 'react-router-dom'
import { getPaginationPages } from '@/shared/lib/getPaginationPages'
import { LoadingState } from '@/shared/ui/loading-state/LoadingState'
import { ErrorState } from '@/shared/ui/error-state/ErrorState'
import { EmptyState } from '@/shared/ui/empty-state/EmptyState'
import { isNotFoundError, parseApiError } from '@/shared/lib/parseApiError'
import { Search } from '@/shared/ui/search/Search'

import s from './CharactersPage.module.scss'
import { useUrlSearchDraft } from '@/shared/lib/hooks/useUrlSearchDraft'

export const CharactersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const rawPage = searchParams.get('page')
  const name = searchParams.get('name') ?? ''

  const { value, onSearch, onValueChange, onKeyDown } = useUrlSearchDraft('name')

  const parsedPage = Number(rawPage)
  const page = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1

  const { data, isLoading, error } = useGetCharactersQuery({ page, name })

  const handlePagePrev = () => {
    if (page === 1) return

    const params = new URLSearchParams(searchParams)
    params.set('page', String(page - 1))
    setSearchParams(params)
  }

  const handlePageNext = () => {
    if (!data?.info.next) return

    const params = new URLSearchParams(searchParams)
    params.set('page', String(page + 1))

    setSearchParams(params)
  }

  const handlePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', String(newPage))
    setSearchParams(params)
  }

  if (isLoading) return <LoadingState message="Loading characters..." />

  if (isNotFoundError(error)) {
    return <EmptyState message="No characters found" />
  }

  if (error) {
    return <ErrorState message={parseApiError(error, 'Failed to load characters')} />
  }

  if (!data?.results.length) {
    return <EmptyState message="No characters found" />
  }

  const pagesArray = getPaginationPages(data.info.pages, page)

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
      <div className={s.pagination}>
        <button onClick={handlePagePrev} disabled={page === 1}>
          Prev
        </button>
        <div className={s.pages}>
          {pagesArray.map(p => (
            <button key={p} className={page === p ? s.active : ''} onClick={() => handlePage(p)}>
              {p}
            </button>
          ))}
        </div>
        <button onClick={handlePageNext} disabled={!data.info.next}>
          Next
        </button>
      </div>
    </>
  )
}
