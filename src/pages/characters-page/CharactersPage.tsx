import {
  useGetCharactersQuery,
  useGetEpisodesByIdsQuery,
} from '@/entities/character/api/characterApi'
import { CharacterCard } from '@/entities/character/ui/character-card/CharacterCard'
import { useSearchParams } from 'react-router-dom'
import { LoadingState } from '@/shared/ui/loading-state/LoadingState'
import { ErrorState } from '@/shared/ui/error-state/ErrorState'
import { EmptyState } from '@/shared/ui/empty-state/EmptyState'
import { isNotFoundError, apiError } from '@/shared/lib/apiError'
import { Search } from '@/shared/ui/search/Search'
import { useUrlSearchDraft } from '@/shared/lib/hooks/useUrlSearchDraft'
import { Pagination } from '@/shared/ui/pagination/Pagination'
import { CharacterFilters } from '@/features/character-filters/ui/CharacterFilters'
import { updateParams } from '@/shared/lib/updateParams'
import { getCharactersParams } from '@/pages/characters-page/lib/useCharactersParams'

import s from './CharactersPage.module.scss'

export const CharactersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const { page, name, status, gender } = getCharactersParams(searchParams)

  const { value, onSearch, onValueChange, onKeyDown } = useUrlSearchDraft('name')

  const { data, isLoading, isFetching, error } = useGetCharactersQuery({
    page,
    name,
    status,
    gender,
  })

  const handlePageChange = (newPage: number) => {
    updateParams(searchParams, setSearchParams, {
      page: String(newPage),
    })
  }

  const characters = data?.results ?? []

  const firstEpisodeIds = [
    ...new Set(
      characters
        .map(character => character.episode[0]?.split('/').at(-1))
        .filter((id): id is string => Boolean(id)),
    ),
  ].join(',')

  const { data: episodes = [] } = useGetEpisodesByIdsQuery(firstEpisodeIds, {
    skip: !firstEpisodeIds,
  })

  const episodeNamesById = new Map(episodes.map(episode => [String(episode.id), episode.name]))

  const isNotFound = isNotFoundError(error)
  const isCommonError = Boolean(error && !isNotFound)
  const isRequestInProgress = isLoading || isFetching

  const isEmpty = !isRequestInProgress && !error && characters.length === 0
  const canShowCharacters = !isRequestInProgress && !error && characters.length > 0

  return (
    <>
      <div className={s.toolbar}>
        <div className={s.searchWrap}>
          <Search
            placeholder="Search Characters"
            value={value}
            onSearch={onSearch}
            onValueChange={onValueChange}
            onKeyDown={onKeyDown}
          />
        </div>
        <div className={s.filters}>
          <CharacterFilters />
        </div>
      </div>
      <div className={s.content}>
        {isRequestInProgress && <LoadingState message="Loading characters..." />}

        {isNotFound && !isRequestInProgress && <EmptyState message="No characters found" />}

        {isCommonError && !isRequestInProgress && (
          <ErrorState message={apiError(error, 'Failed to load characters')} />
        )}

        {isEmpty && <EmptyState message="No characters found" />}

        {canShowCharacters && data && (
          <>
            <div className={s.list}>
              {characters.map(character => {
                const firstEpisodeId = character.episode[0]?.split('/').at(-1)

                const firstEpisodeName = firstEpisodeId
                  ? episodeNamesById.get(firstEpisodeId)
                  : undefined

                return (
                  <CharacterCard
                    key={character.id}
                    character={character}
                    firstEpisodeName={firstEpisodeName}
                  />
                )
              })}
            </div>

            <Pagination
              totalPages={data.info.pages}
              currentPage={page}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </>
  )
}
