import { baseApi } from '@/shared/api/baseApi'
import type { CharactersResponse } from '@/entities/character/model/types'

export const characterApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCharacters: builder.query<CharactersResponse, { page: number; name?: string }>({
      query: ({ page, name }) => ({
        url: 'character',
        params: {
          page,
          ...(name ? { name } : {}),
        },
      }),
    }),
  }),
})

export const { useGetCharactersQuery } = characterApi
