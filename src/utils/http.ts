import { STATUS_CODES } from '@constants/http'
import { AppError } from './AppError'

export function isAppError(error: unknown) {
  return error instanceof AppError
}

export function isUnauthorizedError(status?: number) {
  const statusNumber = Number(status)
  return (
    !!statusNumber &&
    (statusNumber === STATUS_CODES.UNAUTHORIZED ||
      statusNumber === STATUS_CODES.FORBIDDEN)
  )
}

export function isExpiredTokenError(message?: string) {
  return message === 'token.invalid' || message === 'token.expired'
}
