import { describe, expect, it } from 'vitest'
import { apiError, isNotFoundError } from './apiError'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'

describe('apiError', () => {
  it('returns fallback message when error is undefined', () => {
    expect(apiError(undefined, 'Fallback')).toBe('Fallback')
  })

  it('returns message from 400 error data', () => {
    const error: FetchBaseQueryError = {
      status: 400,
      data: { message: 'Invalid request' },
    }

    expect(apiError(error)).toBe('Invalid request')
  })

  it('returns not found message for 404', () => {
    const error: FetchBaseQueryError = {
      status: 404,
      data: undefined,
    }

    expect(apiError(error)).toBe('Not found')
  })

  it('returns network error message for FETCH_ERROR', () => {
    const error: FetchBaseQueryError = {
      status: 'FETCH_ERROR',
      error: 'Failed to fetch',
    }

    expect(apiError(error)).toBe('Unable to reach server. Check your connection')
  })
})

describe('isNotFoundError', () => {
  it('returns true for 404 error', () => {
    const error: FetchBaseQueryError = {
      status: 404,
      data: undefined,
    }

    expect(isNotFoundError(error)).toBe(true)
  })

  it('returns false for non-404 error', () => {
    const error: FetchBaseQueryError = {
      status: 500,
      data: undefined,
    }

    expect(isNotFoundError(error)).toBe(false)
  })
})
