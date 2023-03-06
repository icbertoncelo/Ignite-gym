import { StatusBar } from 'react-native'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import { NativeBaseProvider } from 'native-base'
import { Loading } from '@components/Loading'
import { DEFAULT_THEME } from './src/theme'
import { AppRoutes } from '@routes/index'

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  })

  return (
    <NativeBaseProvider theme={DEFAULT_THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {!fontsLoaded ? <Loading /> : <AppRoutes />}
    </NativeBaseProvider>
  )
}
