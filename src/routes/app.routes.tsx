import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs'
import { Platform } from 'react-native'

import { HomeScreen } from '@screens/Home'
import { ProfileScreen } from '@screens/Profile'
import { HistoryScreen } from '@screens/History'
import { ExerciseScreen } from '@screens/Exercise'

import HomeSvg from '@assets/home.svg'
import HistorySvg from '@assets/history.svg'
import ProfileSvg from '@assets/profile.svg'
import { gluestackUIConfig } from '../../config/gluestack-ui.config'

export type AppTabParamList = {
  home: undefined
  history: undefined
  profile: undefined
  exercise: {
    exerciseId: string
  }
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppTabParamList>

const { Navigator, Screen } = createBottomTabNavigator<AppTabParamList>()

export function AppNavigator() {
  const { colors, space } = gluestackUIConfig.tokens
  const iconSize = space['6']

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.green500,
        tabBarInactiveTintColor: colors.gray200,
        tabBarStyle: {
          backgroundColor: colors.gray600,
          borderTopWidth: 0,
          height: Platform.OS === 'android' ? 'auto' : space[24],
          padding: Platform.OS === 'android' ? space[6] : 'auto',
        },
      }}
    >
      <Screen
        name="home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />
      <Screen
        name="history"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <HistorySvg fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />
      <Screen
        name="profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <ProfileSvg fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />
      <Screen
        name="exercise"
        component={ExerciseScreen}
        options={{
          tabBarButton: () => null,
        }}
      />
    </Navigator>
  )
}
