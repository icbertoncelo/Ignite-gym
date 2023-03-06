import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'
import { SignIn } from '@screens/SignIn'
import { SignUp } from '@screens/SignUp'

type AuthStackParamList = {
  signIn: undefined
  signUp: undefined
}

export type AuthNavigatorRoutesProps =
  NativeStackNavigationProp<AuthStackParamList>

const { Navigator, Screen } = createNativeStackNavigator<AuthStackParamList>()

export function AuthNavigator() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="signIn" component={SignIn} />
      <Screen name="signUp" component={SignUp} />
    </Navigator>
  )
}
