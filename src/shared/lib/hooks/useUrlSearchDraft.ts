import { useEffect, useState, type ChangeEvent, type KeyboardEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { updateParams } from '@/shared/lib/updateParams'

export const useUrlSearchDraft = (paramName: string) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const urlValue = searchParams.get(paramName) ?? ''
  const [value, setValue] = useState(urlValue)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setValue(urlValue)
  }, [urlValue])

  const onSearch = () => {
    updateParams(searchParams, setSearchParams, {
      page: '1',
      [paramName]: value.trim(),
    })
  }

  const onValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
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
