import { baseApi } from '@/shared/api/baseApi'
import type { CharactersResponse } from '@/entities/character/model/types'

type CharactersArgs = {
  page: number
  name?: string | null
}

export const characterApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCharacters: builder.query<CharactersResponse, CharactersArgs>({
      query: ({ page, name }) => {
        const params = new URLSearchParams()
        params.set('page', String(page))

        if (name) {
          params.set('name', name)
        }

        return `character?${params.toString()}`
      },
    }),
  }),
})

export const { useGetCharactersQuery } = characterApi
