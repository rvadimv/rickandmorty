import { baseApi } from '@/shared/api/baseApi'
import type { Character, CharactersResponse } from '@/entities/character/model/types'

export const characterApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCharacters: builder.query<CharactersResponse, { page: number; name?: string }>({
      query: ({ page, name }) => ({
        url: 'character',
        params: {
          page,
          ...(name?.trim() ? { name: name.trim() } : {}),
        },
      }),
    }),
    getCharacter: builder.query<Character, string>({
      query: id => ({
        url: `character/${id}`,
      }),
    }),
  }),
})

export const { useGetCharactersQuery, useGetCharacterQuery } = characterApi
