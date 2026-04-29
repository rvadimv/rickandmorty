import type { ChangeEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { updateParams } from '@/shared/lib/updateParams'

export const CharacterFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const currentStatus = searchParams.get('status') ?? ''

  const onSelectStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value

    updateParams(searchParams, setSearchParams, {
      page: '1',
      status: value,
    })
  }

  return (
    <select value={currentStatus} onChange={onSelectStatus}>
      <option value="">All</option>
      <option value="alive">Alive</option>
      <option value="dead">Dead</option>
    </select>
  )
}
