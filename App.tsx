import { StatusBar } from 'react-native'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import { GluestackUIStyledProvider } from '@gluestack-ui/themed'

import { Loading } from '@components/Loading'
import { MainRoutes } from './src/routes'
import { config } from './config/gluestack-ui.config'
import { AuthProvider } from '@contexts/AuthContext'

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  })

  return (
    <GluestackUIStyledProvider config={config}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {!fontsLoaded ? (
        <Loading />
      ) : (
        <AuthProvider>
          <MainRoutes />
        </AuthProvider>
      )}
    </GluestackUIStyledProvider>
  )
}
