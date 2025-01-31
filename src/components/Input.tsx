import { Input as GluestackInput, InputField } from '@gluestack-ui/themed'
import { ComponentProps } from 'react'

interface InputProps extends ComponentProps<typeof InputField> {
  error?: string | null
  isReadOnly?: boolean
}

export function Input({ error = null, isReadOnly, ...rest }: InputProps) {
  return (
    <GluestackInput
      h="$14"
      borderWidth="$0"
      borderRadius="$md"
      $focus={{
        borderWidth: 1,
        borderColor: '$green500',
      }}
      isReadOnly={isReadOnly}
      opacity={isReadOnly ? 0.5 : 1}
    >
      <InputField
        color="$white"
        fontFamily="$body"
        placeholderTextColor="$gray300"
        bg="$gray700"
        px="$8"
        {...rest}
      />
    </GluestackInput>
  )
}
