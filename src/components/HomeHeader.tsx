import { Heading, HStack, Text, Icon, VStack } from '@gluestack-ui/themed'
import { UserPhoto } from './UserPhoto'
import { TouchableOpacity } from 'react-native'
import { LogOut } from 'lucide-react-native'
import { useAuth } from '@hooks/useAuth'

import defaultProfilePhoto from '@assets/userPhotoDefault.png'

export function HomeHeader() {
  const { user, signOut } = useAuth()

  const avatarSource = user?.avatar
    ? {
        uri: user.avatar,
      }
    : defaultProfilePhoto

  return (
    <HStack bg="$gray600" pt="$16" pb="$5" px="$8" alignItems="center">
      <UserPhoto source={avatarSource} w="$16" h="$16" mr="$4" />
      <VStack flex={1}>
        <Text color="$gray100" fontSize="$md">
          Olá,
        </Text>
        <Heading color="$gray100" fontSize="$md">
          {user?.name}
        </Heading>
      </VStack>

      <TouchableOpacity onPress={signOut}>
        <Icon as={LogOut} color="$gray200" size="xl" />
      </TouchableOpacity>
    </HStack>
  )
}
