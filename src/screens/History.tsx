import { useState } from 'react'
import { Heading, VStack, Text, Center } from '@gluestack-ui/themed'

import { HistoryCard } from '@components/HistoryCard'
import { ScreenHeader } from '@components/ScreenHeader'
import { SectionList } from 'react-native'

interface ExerciseHistoryItem {
  title: string
  data: string[]
}

export function History() {
  const [exercises, setExercises] = useState([
    {
      title: '10.05.2023',
      data: ['Remada Baixa', 'Puxada alta'],
    },
    {
      title: '08.05.2023',
      data: ['Remada Cavalinho'],
    },
  ])

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />

      <SectionList<string, ExerciseHistoryItem>
        sections={exercises}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <HistoryCard />}
        renderSectionHeader={({ section }) => (
          <Heading color="$gray200" fontSize="$md" mt="$10" mb="$3">
            {section.title}
          </Heading>
        )}
        showsVerticalScrollIndicator={false}
        style={{
          paddingHorizontal: 32,
        }}
        contentContainerStyle={
          exercises.length === 0 && { flex: 1, justifyContent: 'center' }
        }
        ListEmptyComponent={() => (
          <Center>
            <Text color="$gray100" textAlign="center">
              Não há exercícios registrados hoje
            </Text>
          </Center>
        )}
      />
    </VStack>
  )
}
