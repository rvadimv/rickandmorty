import { useGetCharactersQuery } from '@/entities/character/api/characterApi'
import { CharacterCard } from '@/entities/character/ui/character-card/CharacterCard'
import { useSearchParams } from 'react-router-dom'

import s from './CharactersPage.module.scss'
import { getPaginationPages } from '@/shared/lib/getPaginationPages.ts'

export const CharactersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const rawPage = searchParams.get('page')
  const parsedPage = Number(rawPage)
  const page = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1

  const { data, isLoading, error } = useGetCharactersQuery(page)

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

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Failed to load characters</div>
  if (!data?.results.length) return <div>No characters found</div>

  const pagesArray = getPaginationPages(data?.info.pages, page)

  return (
    <>
      <h1>Characters</h1>
      <div className={s.list}>
        {data?.results.map(char => (
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
        <button onClick={handlePageNext} disabled={!data?.info.next}>
          Next
        </button>
      </div>
    </>
  )
}
