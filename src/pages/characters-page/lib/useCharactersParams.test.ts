import { describe, expect, it } from 'vitest'
import { getCharactersParams } from './useCharactersParams'

describe('getCharactersParams', () => {
  it('returns default values when search params are empty', () => {
    const params = new URLSearchParams()

    expect(getCharactersParams(params)).toEqual({
      page: 1,
      name: '',
      status: '',
      gender: '',
    })
  })

  it('returns page from search params', () => {
    const params = new URLSearchParams('page=3')

    expect(getCharactersParams(params).page).toBe(3)
  })

  it('returns page 1 when page is invalid', () => {
    const params = new URLSearchParams('page=abc')

    expect(getCharactersParams(params).page).toBe(1)
  })

  it('returns page 1 when page is less than 1', () => {
    const params = new URLSearchParams('page=0')

    expect(getCharactersParams(params).page).toBe(1)
  })

  it('returns filters from search params', () => {
    const params = new URLSearchParams('name=rick&status=alive&gender=male&page=2')

    expect(getCharactersParams(params)).toEqual({
      page: 2,
      name: 'rick',
      status: 'alive',
      gender: 'male',
    })
  })
})
