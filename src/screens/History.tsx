import { useCallback, useState } from 'react'
import { Heading, VStack, Text, Center } from '@gluestack-ui/themed'

import { HistoryCard } from '@components/HistoryCard'
import { ScreenHeader } from '@components/ScreenHeader'
import { SectionList, Alert } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { getHistory } from 'src/network/history'
import { isAppError } from '@utils/http'
import { Loading } from '@components/Loading'
import { History, HistoryByDay } from '@dtos/history'

export function HistoryScreen() {
  const [history, setHistory] = useState<HistoryByDay[]>([])
  const [isHistoryLoading, setIsHistoryLoading] = useState(false)

  useFocusEffect(
    useCallback(() => {
      let isActive = true

      async function loadHistory() {
        try {
          setIsHistoryLoading(true)
          const data = await getHistory()

          if (isActive) {
            setHistory(data)
          }
        } catch (error) {
          if (isAppError(error)) {
            return Alert.alert(error.message)
          }
        } finally {
          setIsHistoryLoading(false)
        }
      }

      loadHistory()

      return () => {
        isActive = false
      }
    }, []),
  )

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />

      {isHistoryLoading ? (
        <Loading />
      ) : (
        <SectionList<History, HistoryByDay>
          sections={history}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <HistoryCard name={item.name} group={item.group} hour={item.hour} />
          )}
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
            history.length === 0 && { flex: 1, justifyContent: 'center' }
          }
          ListEmptyComponent={() => (
            <Center>
              <Text color="$gray100" textAlign="center">
                Não há exercícios registrados hoje
              </Text>
            </Center>
          )}
        />
      )}
    </VStack>
  )
}
