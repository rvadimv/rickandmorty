import { baseApi } from '@/shared/api/baseApi'
import type { Character, CharactersResponse, Episode } from '@/entities/character/model/types'

export const characterApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCharacters: builder.query<
      CharactersResponse,
      { page: number; name?: string; status?: string; gender?: string }
    >({
      query: ({ page, name, status, gender }) => ({
        url: 'character',
        params: {
          page,
          ...(name?.trim() ? { name: name.trim() } : {}),
          ...(status ? { status } : {}),
          ...(gender ? { gender } : {}),
        },
      }),
    }),
    getCharacter: builder.query<Character, string>({
      query: id => ({
        url: `character/${id}`,
      }),
    }),
    getEpisode: builder.query<Episode, string>({
      query: id => ({
        url: `episode/${id}`,
      }),
    }),
    getEpisodesByIds: builder.query<Episode[], string>({
      query: ids => ({
        url: `episode/${ids}`,
      }),
      transformResponse: (response: Episode | Episode[]) => {
        return Array.isArray(response) ? response : [response]
      },
    }),
  }),
})

export const {
  useGetCharactersQuery,
  useGetCharacterQuery,
  useGetEpisodeQuery,
  useGetEpisodesByIdsQuery,
} = characterApi
