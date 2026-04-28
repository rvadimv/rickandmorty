import type { ChangeEventHandler, KeyboardEventHandler } from 'react'

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
    <div>
      <input
        value={value}
        onChange={onValueChange}
        onKeyDown={onKeyDown}
        type="text"
        placeholder={placeholder}
      />
      <button onClick={onSearch}>Search</button>
    </div>
  )
}
