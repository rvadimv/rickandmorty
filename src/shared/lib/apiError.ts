import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import type { SerializedError } from '@reduxjs/toolkit'

function isErrorWithMessage(error: unknown): error is { message: string } {
  if (typeof error !== 'object' || error === null) return false

  const e = error as Record<string, unknown>

  return typeof e.message === 'string'
}

function isErrorWithErrorField(error: unknown): error is { error: string } {
  if (typeof error !== 'object' || error === null) return false

  const e = error as Record<string, unknown>

  return typeof e.error === 'string'
}

function extractMessage(data: unknown): string | null {
  if (!data) return null

  if (typeof data === 'string') return data

  if (isErrorWithMessage(data)) {
    return data.message
  }

  if (isErrorWithErrorField(data)) {
    return data.error
  }

  return null
}

export function isNotFoundError(
  error: FetchBaseQueryError | SerializedError | undefined,
): error is FetchBaseQueryError {
  return !!error && 'status' in error && error.status === 404
}

export const apiError = (
  error: FetchBaseQueryError | SerializedError | undefined,
  fallbackMessage = 'Something went wrong',
) => {
  if (!error) return fallbackMessage

  if ('status' in error) {
    if (typeof error.status === 'number') {
      switch (error.status) {
        case 400:
          return extractMessage(error.data) || 'Bad request'

        case 401:
          return 'Unauthorized'

        case 403:
          return 'Forbidden'

        case 404:
          return extractMessage(error.data) || 'Not found'

        case 500:
          return 'Server error. Try again later'

        default:
          return extractMessage(error.data) || `Request failed (${error.status})`
      }
    }

    switch (error.status) {
      case 'FETCH_ERROR':
        return 'Unable to reach server. Check your connection'

      case 'PARSING_ERROR':
        return 'Invalid server response'

      case 'TIMEOUT_ERROR':
        return 'Request timeout. Try again'

      case 'CUSTOM_ERROR':
        return error.error || fallbackMessage

      default:
        return fallbackMessage
    }
  }

  if ('message' in error && typeof error.message === 'string') {
    return error.message
  }

  return fallbackMessage
}
