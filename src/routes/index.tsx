import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { Box, useTheme } from 'native-base'
import { AppNavigator } from './app.routes'
// import { AuthNavigator } from './auth.routes'

export function MainRoutes() {
  const { colors } = useTheme()

  const theme = DefaultTheme
  theme.colors.background = colors.gray[700]

  return (
    <Box flex={1} bg="gray.700">
      <NavigationContainer theme={theme}>
        <AppNavigator />
      </NavigationContainer>
    </Box>
  )
}
