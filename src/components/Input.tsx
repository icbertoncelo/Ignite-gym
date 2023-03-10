import { Input as NBInput, IInputProps } from 'native-base'

export function Input({ ...rest }: IInputProps) {
  return (
    <NBInput
      bg="gray.700"
      h={14}
      px={8}
      borderWidth={0}
      fontSize="md"
      color="white"
      fontFamily="body"
      mb={4}
      placeholderTextColor="gray.300"
      _focus={{
        bg: 'gray.700',
        borderWidth: 1,
        borderColor: 'green.500',
      }}
      {...rest}
    />
  )
}
