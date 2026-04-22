import { baseApi } from '@/shared/api/baseApi'
import type { CharactersResponse } from '@/entities/character/model/types'

export const characterApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCharacters: builder.query<CharactersResponse, number | void>({
      query: (page = 1) => `character?page=${page}`,
    }),
  }),
})

export const { useGetCharactersQuery } = characterApi
