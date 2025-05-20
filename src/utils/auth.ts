import { AUTH_TOKEN_STORAGE, USER_STORAGE } from '@constants/storage'
import { User } from '@dtos/user'
import { storageGetItem, storageSetItem } from './storage'
import { TokenInfo } from '@dtos/sign'

export async function setUserOnStorage(user: User) {
  await storageSetItem<User>(USER_STORAGE, user)
}

export async function getUserFromStorage() {
  const storageData = await storageGetItem<User>(USER_STORAGE)

  return storageData
}

export async function setTokensOnStorage(tokens: TokenInfo) {
  await storageSetItem<TokenInfo>(AUTH_TOKEN_STORAGE, tokens)
}

export async function getTokensFromStorage() {
  const storageData = await storageGetItem<TokenInfo>(AUTH_TOKEN_STORAGE)

  return storageData
}
