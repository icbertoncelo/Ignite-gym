import { Image } from '@gluestack-ui/themed'
import { ComponentProps } from 'react'

interface ImageProps extends ComponentProps<typeof Image> {}

export function UserPhoto({ size, ...rest }: ImageProps) {
  return (
    <Image
      alt="Foto de perfil redonda do usuário"
      rounded="$full"
      borderWidth="$2"
      borderColor="$gray400"
      backgroundColor="$gray500"
      {...rest}
    />
  )
}
