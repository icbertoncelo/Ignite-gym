import { AppError } from './AppError'

export function isAppError(error: Error | unknown) {
  return error instanceof AppError
}
