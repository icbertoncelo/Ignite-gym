import { useCallback, useEffect, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { Heading, HStack, Text, VStack } from '@gluestack-ui/themed'

import { ExerciseCard } from '@components/ExerciseCard'
import { Group } from '@components/Group'
import { HomeHeader } from '@components/HomeHeader'
import { AppNavigatorRoutesProps } from '@routes/app.routes'
import { Alert, FlatList } from 'react-native'
import { getGroups } from 'src/network/group'
import { isAppError } from '@utils/http'
import { getExercisesByGroup } from 'src/network/exercise'
import { Exercise } from '@dtos/exercises'
import { Loading } from '@components/Loading'

export function HomeScreen() {
  const [groups, setGroups] = useState<string[]>([])
  const [isLoadGroupsLoading, setIsLoadGroupsLoading] = useState(false)
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [isLoadExercisesLoading, setIsLoadExercisesLoading] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState('costas')
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleNavigateToExerciseDetailsScreen(exerciseId: string) {
    navigation.navigate('exercise', {
      exerciseId,
    })
  }

  const loadGroups = useCallback(async () => {
    try {
      setIsLoadGroupsLoading(true)
      const data = await getGroups()
      setGroups(data)
    } catch (error) {
      if (isAppError(error)) {
        return Alert.alert(error.message)
      }
    } finally {
      setIsLoadGroupsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadGroups()
  }, [loadGroups])

  useFocusEffect(
    useCallback(() => {
      let isActive = true

      async function loadExerciseByGroup() {
        try {
          setIsLoadExercisesLoading(true)
          const data = await getExercisesByGroup(selectedGroup)

          if (isActive) {
            setExercises(data)
          }
        } catch (error) {
          if (isAppError(error)) {
            return Alert.alert(error.message)
          }
        } finally {
          setIsLoadExercisesLoading(false)
        }
      }

      loadExerciseByGroup()

      return () => {
        isActive = false
      }
    }, [selectedGroup]),
  )

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList<string>
        data={groups}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={selectedGroup.toUpperCase() === item.toUpperCase()}
            onPress={() => setSelectedGroup(item)}
          />
        )}
        contentContainerStyle={{
          paddingHorizontal: 32,
        }}
        style={{
          marginVertical: 32,
          maxHeight: 44,
          minHeight: 44,
        }}
      />

      {isLoadExercisesLoading ? (
        <Loading />
      ) : (
        <VStack flex={1} px="$8">
          <HStack justifyContent="space-between" mb="$5">
            <Heading color="$gray200" fontSize="$md" fontFamily="$heading">
              Exercícios
            </Heading>

            <Text color="$gray200" fontSize="$sm" fontFamily="$body">
              {exercises.length}
            </Text>
          </HStack>

          <FlatList<Exercise>
            data={exercises}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ExerciseCard
                onPress={() => handleNavigateToExerciseDetailsScreen(item.id)}
                name={item.name}
                repetitions={item.repetitions}
                thumbUri={item.thumbUri ?? ''}
              />
            )}
            contentContainerStyle={{
              paddingBottom: 20,
            }}
            showsVerticalScrollIndicator={false}
          />
        </VStack>
      )}
    </VStack>
  )
}
