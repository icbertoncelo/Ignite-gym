import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import {
  Center,
  Heading,
  ScrollView,
  Skeleton,
  Text,
  useToast,
  VStack,
} from '@gluestack-ui/themed'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'

import { Input } from '@components/Input'
import { ScreenHeader } from '@components/ScreenHeader'
import { UserPhoto } from '@components/UserPhoto'
import { Button } from '@components/Button'

const PHOTO_HEIGHT = 33
const PHOTO_SIZE_IN_MB = 5
const DEFAULT_PROFILE_URI = 'https://github.com/icbertoncelo.png'

export function Profile() {
  const [isPhotoLoading, setIsPhotoLoading] = useState(false)
  const [profileImageUri, setProfileImageUri] = useState(DEFAULT_PROFILE_URI)

  const toast = useToast()

  async function handlePickUserPhoto() {
    setIsPhotoLoading(true)

    try {
      const selectedPhoto = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      })

      if (!selectedPhoto.canceled) {
        const photoUri = selectedPhoto.assets[0].uri

        const photoInfo = await FileSystem.getInfoAsync(photoUri)

        if (photoInfo.size && photoInfo.size / 1024 / 1024 > PHOTO_SIZE_IN_MB) {
          return toast.show({
            title: 'Imagem muito grande',
            description: `Escolha uma imagem de até ${PHOTO_SIZE_IN_MB}Mb`,
            placement: 'top',
            bgColor: 'red.500',
          })
        }

        setProfileImageUri(photoUri)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsPhotoLoading(false)
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 36,
        }}
      >
        <Center mt={6} px={10}>
          {isPhotoLoading ? (
            <Skeleton
              w={PHOTO_HEIGHT}
              h={PHOTO_HEIGHT}
              rounded="full"
              startColor="gray.500"
              endColor="gray.400"
            />
          ) : (
            <UserPhoto
              source={{
                uri: profileImageUri,
              }}
              alt="Foto do usuário"
              size={PHOTO_HEIGHT}
            />
          )}

          <TouchableOpacity onPress={handlePickUserPhoto}>
            <Text
              color="green.500"
              fontWeight="bold"
              fontSize="md"
              mt={2}
              mb={8}
            >
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Input placeholder="Nome" bg="gray.600" />
          <Input placeholder="Email" bg="gray.600" isDisabled />

          <Heading
            color="gray.200"
            fontSize="md"
            alignSelf="flex-start"
            mb={2}
            mt={8}
          >
            Alterar Senha
          </Heading>

          <Input bg="gray.600" placeholder="Senha antiga" secureTextEntry />
          <Input bg="gray.600" placeholder="Nova Senha" secureTextEntry />
          <Input
            bg="gray.600"
            placeholder="Confirme a nova senha"
            secureTextEntry
          />

          <Button title="Atualizar" mt={4} />
        </Center>
      </ScrollView>
    </VStack>
  )
}
