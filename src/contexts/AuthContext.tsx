import { SignInFormData } from '@dtos/sign'
import { User } from '@dtos/user'
import { api } from '@services/api'
import {
  storageGetItem,
  storageRemoveItem,
  storageSetItem,
} from '@utils/storage'
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { USER_STORAGE } from '@constants/storage'

interface AuthContextType {
  user: User | null
  signIn: ({ email, password }: SignInFormData) => Promise<void>
  signOut: () => Promise<void>
  isLoggedUserLoading: boolean
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoggedUserLoading, serIsLoggedUserLoading] = useState(false)

  const signIn = useCallback(async ({ email, password }: SignInFormData) => {
    const { data } = await api.post('/sessions', { email, password })

    if (data.user) {
      setUser(data.user)
      storageSetItem<User>(USER_STORAGE, data.user)
    }
  }, [])

  const signOut = useCallback(async () => {
    try {
      serIsLoggedUserLoading(true)
      await storageRemoveItem(USER_STORAGE)
      setUser(null)
    } catch (error) {
      console.log(error)
    } finally {
      serIsLoggedUserLoading(false)
    }
  }, [])

  const loadLoggedUserFromAsyncStorage = useCallback(async () => {
    try {
      serIsLoggedUserLoading(true)
      const loggedUser = await storageGetItem<User>(USER_STORAGE)

      if (loggedUser) {
        setUser(loggedUser)
      }
    } catch (error) {
      setUser(null)
    } finally {
      serIsLoggedUserLoading(false)
    }
  }, [])

  useEffect(() => {
    loadLoggedUserFromAsyncStorage()
  }, [loadLoggedUserFromAsyncStorage])

  return (
    <AuthContext.Provider
      value={{ user, signIn, signOut, isLoggedUserLoading }}
    >
      {children}
    </AuthContext.Provider>
  )
}
