import { api } from '@services/api'
import { SignInFormData, User } from '@utils/Dtos'
import { createContext, ReactNode, useCallback, useState } from 'react'

interface AuthContextType {
  user: User | null
  signIn: ({ email, password }: SignInFormData) => Promise<void>
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)

  const signIn = useCallback(async ({ email, password }: SignInFormData) => {
    const { data } = await api.post('/sessions', { email, password })

    if (data.user) {
      setUser(data.user)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}
