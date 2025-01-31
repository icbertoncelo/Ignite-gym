import {
  Box,
  Heading,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
} from '@gluestack-ui/themed'
import { ScrollView, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'

import BodySvg from 'assets/body.svg'
import SeriesSvg from 'assets/series.svg'
import RepetitionsSvg from 'assets/repetitions.svg'
import { Button } from '@components/Button'
import { ArrowLeft } from 'lucide-react-native'

export function Exercise() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  function handleGoBack() {
    navigation.goBack()
  }

  return (
    <VStack flex={1}>
      <Box px="$8" bg="gray600" pt="$12">
        <HStack justifyContent="space-between" my="$4" alignItems="center">
          <TouchableOpacity onPress={handleGoBack}>
            <Icon as={ArrowLeft} color="$green500" size="xl" />
          </TouchableOpacity>
          <Heading color="$gray100" fontSize="$lg" flexShrink={1}>
            Puxada Frontal
          </Heading>

          <HStack alignItems="center">
            <BodySvg />
            <Text color="$gray200" ml="$1" textTransform="capitalize">
              Costas
            </Text>
          </HStack>
        </HStack>
      </Box>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 32,
        }}
      >
        <VStack p="$8">
          <Image
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBzvfnvTEW3WcW-GBzeolwiPHXiswMUHxk3A&usqp=CAU',
            }}
            h="$80"
            w="$full"
            alt="Nome do exercício"
            mb="$3"
            resizeMode="cover"
            rounded="$lg"
          />

          <Box bg="$gray600" rounded="$md" p="$4">
            <HStack alignItems="center" justifyContent="space-around" mb="$6">
              <HStack alignItems="center">
                <SeriesSvg />
                <Text color="$gray200" ml="$2">
                  3 séries
                </Text>
              </HStack>
              <HStack alignItems="center">
                <RepetitionsSvg />
                <Text color="$gray200" ml="$2">
                  12 repetições
                </Text>
              </HStack>
            </HStack>

            <Button title="Marcar como realizado" />
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  )
}
