import {
  Box,
  Heading,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
} from '@gluestack-ui/themed'
import { Alert, ScrollView, TouchableOpacity } from 'react-native'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { AppNavigatorRoutesProps, AppTabParamList } from '@routes/app.routes'

import BodySvg from 'assets/body.svg'
import SeriesSvg from 'assets/series.svg'
import RepetitionsSvg from 'assets/repetitions.svg'
import { Button } from '@components/Button'
import { ArrowLeft } from 'lucide-react-native'
import { useCallback, useEffect, useState } from 'react'
import { getExercise } from 'src/network/exercise'
import { isAppError } from '@utils/http'
import { Loading } from '@components/Loading'
import { Exercise } from '@dtos/exercises'

type ExerciseRouteProp = RouteProp<AppTabParamList, 'exercise'>

export function ExerciseScreen() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const route = useRoute<ExerciseRouteProp>()

  const [exercise, setExercise] = useState<Exercise>({} as Exercise)
  const [isLoadExerciseLoading, setIsLoadExerciseLoading] = useState(false)

  const { exerciseId } = route.params

  function handleGoBack() {
    navigation.goBack()
  }

  const loadExercise = useCallback(async () => {
    try {
      setIsLoadExerciseLoading(true)
      const data = await getExercise(exerciseId)
      setExercise(data)
    } catch (error) {
      if (isAppError(error)) {
        return Alert.alert(error.message)
      }
    } finally {
      setIsLoadExerciseLoading(false)
    }
  }, [exerciseId])

  useEffect(() => {
    loadExercise()
  }, [loadExercise])

  return isLoadExerciseLoading ? (
    <Loading />
  ) : (
    <VStack flex={1}>
      <Box px="$8" bg="gray600" pt="$12">
        <HStack justifyContent="space-between" my="$4" alignItems="center">
          <TouchableOpacity onPress={handleGoBack}>
            <Icon as={ArrowLeft} color="$green500" size="xl" />
          </TouchableOpacity>
          <Heading color="$gray100" fontSize="$lg" flexShrink={1}>
            {exercise.name}
          </Heading>

          <HStack alignItems="center">
            <BodySvg />
            <Text color="$gray200" ml="$1" textTransform="capitalize">
              {exercise.group}
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
              uri: exercise.demoUri,
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
                  {`${exercise.series} séries`}
                </Text>
              </HStack>
              <HStack alignItems="center">
                <RepetitionsSvg />
                <Text color="$gray200" ml="$2">
                  {`${exercise.repetitions} repetições`}
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
