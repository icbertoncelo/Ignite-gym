import { useState } from 'react'
import {
  Heading,
  VStack,
  SectionList,
  Text,
  Center,
} from '@gluestack-ui/themed'

import { HistoryCard } from '@components/HistoryCard'
import { ScreenHeader } from '@components/ScreenHeader'

export function History() {
  const [exercises, setExercises] = useState([
    {
      title: '10.05.2023',
      data: ['Remada Baixa'],
    },
    {
      title: '08.05.2023',
      data: ['Remada Cavalinho'],
    },
  ])

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />

      {/* <SectionList
        sections={exercises}
        keyExtractor={(item: unknown) => item}
        renderItem={({ item }) => <HistoryCard />}
        renderSectionHeader={({ section }) => (
          <Heading color="$gray.200" fontSize="$md" mt="$10" mb="$3">
            {section.title}
          </Heading>
        )}
        px="$8"
        contentContainerStyle={
          exercises.length === 0 && { flex: 1, justifyContent: 'center' }
        }
        ListEmptyComponent={() => (
          <Center>
            <Text color="$gray.100" textAlign="center">
              Não há exercícios registrados hoje ainda
            </Text>
          </Center>
        )}
      /> */}
    </VStack>
  )
}
