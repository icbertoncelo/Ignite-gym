import { IImageProps, Image } from 'native-base'

interface ImageProps extends IImageProps {
  size: number
}

export function UserPhoto({ size, ...rest }: ImageProps) {
  return (
    <Image
      w={size}
      alt="Foto de perfil redonda do usuário"
      h={size}
      rounded="full"
      borderWidth={2}
      borderColor="gray.400"
      {...rest}
    />
  )
}
