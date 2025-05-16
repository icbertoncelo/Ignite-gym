import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'
import { SignInScreen } from '@screens/SignIn'
import { SignUpScreen } from '@screens/SignUp'

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
      <Screen name="signIn" component={SignInScreen} />
      <Screen name="signUp" component={SignUpScreen} />
    </Navigator>
  )
}
