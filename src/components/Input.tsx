import { Input as GluestackInput, InputField } from '@gluestack-ui/themed'
import { ComponentProps } from 'react'

interface InputProps extends ComponentProps<typeof InputField> {
  error?: string | null
}

export function Input({ error = null, ...rest }: InputProps) {
  return (
    <GluestackInput
      bg="$gray700"
      h="$14"
      px="$8"
      borderWidth="$0"
      borderRadius="$md"
      $focus={{
        borderWidth: 1,
        borderColor: '$green500',
      }}
    >
      <InputField
        color="$white"
        fontFamily="$body"
        placeholderTextColor="$gray300"
        {...rest}
      />
    </GluestackInput>
  )
}
