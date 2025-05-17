import { Heading, HStack, Text, VStack } from '@gluestack-ui/themed'

interface HistoryCardProps {
  name: string
  group: string
  hour: string
}

export function HistoryCard({ name, group, hour }: HistoryCardProps) {
  return (
    <HStack
      w="$full"
      px="$5"
      py="$4"
      mb="$3"
      bg="$gray600"
      rounded="$md"
      alignItems="center"
      justifyContent="space-between"
    >
      <VStack mr="$5" flex={1}>
        <Heading
          color="$white"
          fontSize="$md"
          fontFamily="$heading"
          textTransform="capitalize"
          numberOfLines={1}
        >
          {group}
        </Heading>
        <Text color="$gray100" fontSize="$lg" numberOfLines={1}>
          {name}
        </Text>
      </VStack>
      <Text color="$gray300" fontSize="$md">
        {hour}
      </Text>
    </HStack>
  )
}
