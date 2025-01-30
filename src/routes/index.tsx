import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { Box } from '@gluestack-ui/themed'
import { AppNavigator } from './app.routes'
// import { AuthNavigator } from './auth.routes'
import { gluestackUIConfig } from '../../config/gluestack-ui.config'

export function MainRoutes() {
  const theme = DefaultTheme
  theme.colors.background = gluestackUIConfig.tokens.colors.gray700

  return (
    <Box flex={1} bg="$gray.700">
      <NavigationContainer theme={theme}>
        <AppNavigator />
      </NavigationContainer>
    </Box>
  )
}
