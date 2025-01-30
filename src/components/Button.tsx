import { ComponentProps } from 'react'
import {
  Button as GluestackButton,
  Text,
  ButtonSpinner,
} from '@gluestack-ui/themed'

interface ButtonProps extends ComponentProps<typeof GluestackButton> {
  title: string
  variant?: 'solid' | 'outline'
  isLoading?: boolean
}

export function Button({
  title,
  variant = 'solid',
  isLoading,
  ...rest
}: ButtonProps) {
  return (
    <GluestackButton
      w="$full"
      h="$14"
      bg={variant === 'outline' ? 'transparent' : '$green700'}
      borderWidth={variant === 'outline' ? '$1' : '$0'}
      borderColor={variant === 'outline' ? '$green500' : 'transparent'}
      rounded="$sm"
      $active-backgroundColor={
        variant === 'outline' ? '$gray500' : 'transparent'
      }
      $pressed-borderWidth="$0"
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? (
        <ButtonSpinner color={variant === 'outline' ? '$green500' : '$white'} />
      ) : (
        <Text
          color={variant === 'outline' ? '$green500' : '$white'}
          fontFamily="$heading"
          fontSize="$sm"
        >
          {title}
        </Text>
      )}
    </GluestackButton>
  )
}
