import { updateParams } from '@/shared/lib/updateParams'
import { useSearchParams } from 'react-router-dom'

export const useCharacterFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const status = searchParams.get('status') ?? ''
  const gender = searchParams.get('gender') ?? ''

  const setFilter = (key: 'status' | 'gender', value: string) => {
    updateParams(searchParams, setSearchParams, {
      page: '1',
      [key]: value,
    })
  }

  return {
    status,
    gender,
    setFilter,
  }
}
