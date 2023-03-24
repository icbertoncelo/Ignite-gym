import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'
import { Exercise } from '@screens/Exercise'
import { Home } from '@screens/Home'

type HomeStackParamList = {
  home: undefined
  exercise: undefined
}

export type HomeNavigatorRoutesProps =
  NativeStackNavigationProp<HomeStackParamList>

const { Navigator, Screen } = createNativeStackNavigator<HomeStackParamList>()

export function HomeNavigator() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="home" component={Home} />
      <Screen name="exercise" component={Exercise} />
    </Navigator>
  )
}
