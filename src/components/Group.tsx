import { Text, Button } from '@gluestack-ui/themed'
import { ComponentProps } from 'react'

interface GroupProps extends ComponentProps<typeof Button> {
  name: string
  isActive?: boolean
}

export function Group({ name, isActive = false, ...rest }: GroupProps) {
  return (
    <Button
      mr="$3"
      h="$10"
      bg="$gray600"
      rounded="$md"
      justifyContent="center"
      alignItems="center"
      borderColor="$green500"
      borderWidth={isActive ? 1 : 0}
      sx={{
        ':active': {
          borderWidth: 1,
        },
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
    </Button>
  )
}
