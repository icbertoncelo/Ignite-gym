import AsyncStorage from '@react-native-async-storage/async-storage'
import { USER_STORAGE } from 'src/constants/storage'

export async function storageSetItem<T>(key: string, value: T): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(value))
}

export async function storageGetItem<T>(key: string): Promise<T | null> {
  const data = await AsyncStorage.getItem(USER_STORAGE)

  return data ? JSON.parse(data) : null
}
