import { Heading, HStack, Text, Icon, VStack } from '@gluestack-ui/themed'
import { UserPhoto } from './UserPhoto'
import { TouchableOpacity } from 'react-native'
import { LogOut } from 'lucide-react-native'

export function HomeHeader() {
  return (
    <HStack bg="$gray600" pt="$16" pb="$5" px="$8" alignItems="center">
      <UserPhoto
        source={{
          uri: 'https://github.com/icbertoncelo.png',
        }}
        w="$16"
        h="$16"
        mr="$4"
      />
      <VStack flex={1}>
        <Text color="$gray100" fontSize="$md">
          Olá,
        </Text>
        <Heading color="$gray100" fontSize="$md">
          Ian Carlos
        </Heading>
      </VStack>

      <TouchableOpacity>
        <Icon as={LogOut} color="$gray200" size="xl" />
      </TouchableOpacity>
    </HStack>
  )
}
