import { Text, Pressable } from '@gluestack-ui/themed'
import { ComponentProps } from 'react'

interface GroupProps extends ComponentProps<typeof Pressable> {
  name: string
  isActive?: boolean
}

export function Group({ name, isActive = false, ...rest }: GroupProps) {
  return (
    <Pressable
      mr="$3"
      w="$24"
      h="$10"
      bg="$gray600"
      rounded="$md"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      // isPressed={isActive}
      $pressed={{
        borderColor: '$green600',
        borderWidth: 1,
      }}
      {...rest}
    >
      <Text
        color={isActive ? '$green500' : '$gray200'}
        textTransform="uppercase"
        fontSize="$xs"
        fontWeight="bold"
      >
        {name}
      </Text>
    </Pressable>
  )
}
