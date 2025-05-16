import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import {
  Heading,
  HStack,
  Image,
  Text,
  VStack,
  Icon,
} from '@gluestack-ui/themed'

import { ChevronRight } from 'lucide-react-native'

interface ExerciseCardProps extends TouchableOpacityProps {
  name: string
  repetitions: number
  thumbUri: string
}

export function ExerciseCard({
  name,
  repetitions,
  thumbUri,
  ...rest
}: ExerciseCardProps) {
  return (
    <TouchableOpacity {...rest}>
      <HStack
        bg="$gray500"
        alignItems="center"
        p="$2"
        pr="$4"
        rounded="$md"
        mb="$2"
      >
        <Image
          source={{
            uri: thumbUri,
          }}
          alt="Imagem do Exercício"
          w="$16"
          h="$16"
          rounded="$md"
          mr="$4"
          resizeMode="cover"
        />

        <VStack flex={1}>
          <Heading fontSize="$lg" color="$white">
            {name}
          </Heading>
          <Text fontSize="$sm" color="$gray200" mt="$1" numberOfLines={2}>
            {`Séries de ${repetitions} repetições`}
          </Text>
        </VStack>

        <Icon as={ChevronRight} color="$gray300" />
      </HStack>
    </TouchableOpacity>
  )
}
