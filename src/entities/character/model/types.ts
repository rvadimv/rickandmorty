export type CharacterStatus = 'Alive' | 'Dead' | 'unknown'
export type CharacterGender = 'Female' | 'Male' | 'Genderless' | 'unknown'

export type Character = {
  id: number
  name: string
  status: CharacterStatus
  species: string
  type: string
  gender: CharacterGender
  origin: {
    name: string
    url: string
  }
  location: {
    name: string
    url: string
  }
  image: string
  episode: string[]
  url: string
  created: string
}

export type CharactersResponse = {
  info: {
    count: number
    pages: number
    next: string | null
    prev: string | null
  }
  results: Character[]
}

export type Episode = {
  id: number
  name: string
  air_date: string
  episode: string
  characters: string[]
  url: string
  created: string
}
