import { describe, expect, it } from 'vitest'
import { getPaginationPages } from './getPaginationPages'

describe('getPaginationPages', () => {
  it('returns empty array when totalPages is undefined', () => {
    expect(getPaginationPages(undefined, 1)).toEqual([])
  })

  it('returns first block of pages', () => {
    expect(getPaginationPages(20, 1)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  })

  it('returns second block of pages', () => {
    expect(getPaginationPages(20, 11)).toEqual([11, 12, 13, 14, 15, 16, 17, 18, 19, 20])
  })

  it('returns limited last block when total pages is not full block', () => {
    expect(getPaginationPages(15, 11)).toEqual([11, 12, 13, 14, 15])
  })
})
