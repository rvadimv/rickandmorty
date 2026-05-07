import { describe, expect, it, vi } from 'vitest'
import { updateParams } from './updateParams'

describe('updateParams', () => {
  it('sets provided params', () => {
    const searchParams = new URLSearchParams('page=1')
    const setSearchParams = vi.fn()

    updateParams(searchParams, setSearchParams, {
      name: 'rick',
      page: '2',
    })

    const result = setSearchParams.mock.calls[0][0] as URLSearchParams

    expect(result.get('name')).toBe('rick')
    expect(result.get('page')).toBe('2')
  })

  it('deletes params when value is empty string', () => {
    const searchParams = new URLSearchParams('name=rick&page=2')
    const setSearchParams = vi.fn()

    updateParams(searchParams, setSearchParams, {
      name: '',
    })

    const result = setSearchParams.mock.calls[0][0] as URLSearchParams

    expect(result.has('name')).toBe(false)
    expect(result.get('page')).toBe('2')
  })

  it('deletes params when value is null', () => {
    const searchParams = new URLSearchParams('status=alive&page=2')
    const setSearchParams = vi.fn()

    updateParams(searchParams, setSearchParams, {
      status: null,
    })

    const result = setSearchParams.mock.calls[0][0] as URLSearchParams

    expect(result.has('status')).toBe(false)
    expect(result.get('page')).toBe('2')
  })

  it('does not mutate original search params', () => {
    const searchParams = new URLSearchParams('name=rick')
    const setSearchParams = vi.fn()

    updateParams(searchParams, setSearchParams, {
      name: 'morty',
    })

    expect(searchParams.get('name')).toBe('rick')
  })
})
