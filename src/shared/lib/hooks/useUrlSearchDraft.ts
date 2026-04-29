import { useState, type ChangeEvent, type KeyboardEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { updateParams } from '@/shared/lib/updateParams'

export const useUrlSearchDraft = (paramName: string) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const urlValue = searchParams.get(paramName) ?? ''
  const [value, setValue] = useState(urlValue)

  const onSearch = () => {
    updateParams(searchParams, setSearchParams, {
      page: '1',
      [paramName]: value,
    })
  }

  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch()
    }
  }

  return {
    value,
    onSearch,
    onValueChange,
    onKeyDown,
  }
}
