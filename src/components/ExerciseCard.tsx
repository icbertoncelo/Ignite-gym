import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { Heading, HStack, Image, Text, VStack, Icon } from 'native-base'

import { Entypo } from '@expo/vector-icons'

interface ExerciseCardProps extends TouchableOpacityProps {}

export function ExerciseCard({ ...rest }: ExerciseCardProps) {
  return (
    <TouchableOpacity {...rest}>
      <HStack
        bg="gray.500"
        alignItems="center"
        p={2}
        pr={4}
        rounded="md"
        mb={2}
      >
        <Image
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBzvfnvTEW3WcW-GBzeolwiPHXiswMUHxk3A&usqp=CAU',
          }}
          alt="Imagem do Exercício"
          w={16}
          h={16}
          rounded="md"
          mr={4}
          resizeMode="cover"
        />

        <VStack flex={1}>
          <Heading fontSize="lg" color="white">
            Remada baixa
          </Heading>
          <Text fontSize="sm" color="gray.200" mt={1} numberOfLines={2}>
            series de 12 repetições
          </Text>
        </VStack>

        <Icon as={Entypo} name="chevron-thin-right" color="gray.300" />
      </HStack>
    </TouchableOpacity>
  )
}
