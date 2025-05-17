import { Box, Image, Center, Spinner } from '@gluestack-ui/themed'
import { ComponentProps } from 'react'

interface ImageProps extends ComponentProps<typeof Image> {
  isLoading?: boolean
}
type SharedStyleProps = Pick<
  ComponentProps<typeof Box>,
  'rounded' | 'borderWidth' | 'borderColor' | 'w' | 'h' | 'mr'
>

export function UserPhoto({ size, isLoading, w, h, mr, ...rest }: ImageProps) {
  const baseStyle: SharedStyleProps = {
    rounded: '$full',
    borderWidth: '$2',
    borderColor: '$gray400',
    w,
    h,
    mr,
  }

  return isLoading ? (
    <Box {...baseStyle}>
      <Center flex={1}>
        <Spinner color="$green500" />
      </Center>
    </Box>
  ) : (
    <Image
      alt="Foto de perfil redonda do usuário"
      backgroundColor="$gray500"
      {...baseStyle}
      {...rest}
    />
  )
}
