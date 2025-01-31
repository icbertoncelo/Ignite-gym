import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Heading, HStack, Text, VStack } from '@gluestack-ui/themed'

import { ExerciseCard } from '@components/ExerciseCard'
import { Group } from '@components/Group'
import { HomeHeader } from '@components/HomeHeader'
import { AppNavigatorRoutesProps } from '@routes/app.routes'
import { FlatList } from 'react-native'

export function Home() {
  const [groups, setGroups] = useState([
    'Costas',
    'Peito',
    'Ombro',
    'Bíceps',
    'Tríceps',
  ])
  const [exercises, setExercises] = useState([
    'Remada Baixa',
    'Levantamento Terra',
    'Remada Cavalo',
    'Puxada aberta',
    'Terra',
  ])
  const [selectedGroup, setSelectedGroup] = useState('costas')
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleNavigateToExerciseDetailsScreen() {
    navigation.navigate('exercise')
  }

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

      <VStack flex={1} px="$8">
        <HStack justifyContent="space-between" mb="$5">
          <Heading color="$gray200" fontSize="$md" fontFamily="$heading">
            Exercícios
          </Heading>

          <Text color="$gray200" fontSize="$sm" fontFamily="$body">
            {exercises.length}
          </Text>
        </HStack>

        <FlatList<string>
          data={exercises}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <ExerciseCard onPress={handleNavigateToExerciseDetailsScreen} />
          )}
          contentContainerStyle={{
            paddingBottom: 20,
          }}
          showsVerticalScrollIndicator={false}
        />
      </VStack>
    </VStack>
  )
}
