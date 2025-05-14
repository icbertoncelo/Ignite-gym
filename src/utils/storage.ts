import AsyncStorage from '@react-native-async-storage/async-storage'

export async function storageSetItem<T>(key: string, value: T): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(value))
}

export async function storageGetItem<T>(key: string): Promise<T | null> {
  const data = await AsyncStorage.getItem(key)

  return data ? JSON.parse(data) : null
}

export async function storageRemoveItem(key: string): Promise<void> {
  await AsyncStorage.removeItem(key)
}
