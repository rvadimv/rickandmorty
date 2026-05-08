import type { ChangeEventHandler, KeyboardEventHandler } from 'react'
import s from './Search.module.scss'

type Props = {
  value: string
  placeholder: string
  onSearch: () => void
  onValueChange: ChangeEventHandler<HTMLInputElement>
  onKeyDown: KeyboardEventHandler<HTMLInputElement>
}

export const Search = (props: Props) => {
  const { value, placeholder, onSearch, onValueChange, onKeyDown } = props

  return (
    <>
      <input
        aria-label="Search characters"
        value={value}
        onChange={onValueChange}
        onKeyDown={onKeyDown}
        type="text"
        placeholder={placeholder}
        className={s.search}
      />

      <button type="button" onClick={onSearch} disabled={!value.trim()} className={s.button}>
        Search
      </button>
    </>
  )
}
