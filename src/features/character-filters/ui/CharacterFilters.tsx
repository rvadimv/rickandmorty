import type { ChangeEvent } from 'react'
import { useCharacterFilters } from '@/features/character-filters/model/useCharacterFilters'

import s from './CharacterFilters.module.scss'

type FilterKey = 'status' | 'gender'

export const CharacterFilters = () => {
  const { status, gender, setFilter } = useCharacterFilters()

  const handleSelect = (param: FilterKey) => (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value
    setFilter(param, value)
  }

  return (
    <div className={s.filtersWrap}>
      <select value={status} onChange={handleSelect('status')}>
        <option value="">All</option>
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>
      <select value={gender} onChange={handleSelect('gender')}>
        <option value="">All</option>
        <option value="female">Female</option>
        <option value="male">Male</option>
        <option value="genderless">Genderless</option>
        <option value="unknown">Unknown</option>
      </select>
    </div>
  )
}
