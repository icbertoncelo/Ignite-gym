import { useState } from 'react'
import { TouchableOpacity, ScrollView, Alert } from 'react-native'
import { Center, Heading, Text, VStack } from '@gluestack-ui/themed'

import { Input } from '@components/Input'
import { ScreenHeader } from '@components/ScreenHeader'
import { UserPhoto } from '@components/UserPhoto'
import { Button } from '@components/Button'
import * as ImagePicker from 'expo-image-picker'
import { getInfoAsync } from 'expo-file-system'

const DEFAULT_PROFILE_URI = 'https://github.com/icbertoncelo.png'
const PHOTO_SIZE_IN_MB = 5

export function ProfileScreen() {
  const [isPhotoLoading, setIsPhotoLoading] = useState(false)
  const [profileImageUri, setProfileImageUri] = useState(DEFAULT_PROFILE_URI)

  async function handlePickUserPhoto() {
    setIsPhotoLoading(true)
    try {
      const selectedPhoto = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      })
      if (!selectedPhoto.canceled) {
        const photoUri = selectedPhoto.assets[0].uri
        const photoInfo = await getInfoAsync(photoUri)
        if (photoInfo.size && photoInfo.size / 1024 / 1024 < PHOTO_SIZE_IN_MB) {
          return Alert.alert(
            'Imagem muito grande',
            `Escolha uma imagem de até ${PHOTO_SIZE_IN_MB}Mb`,
          )
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
        <Center mt="$6" px="$10">
          <UserPhoto
            source={{
              uri: profileImageUri,
            }}
            alt="Foto do usuário"
            size="xl"
          />

          <TouchableOpacity onPress={handlePickUserPhoto}>
            <Text
              color="$green500"
              fontWeight="bold"
              fontSize="$md"
              mt="$2"
              mb="$8"
            >
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Center w="$full" gap="$4">
            <Input placeholder="Nome" bg="$gray600" />
            <Input placeholder="Email" bg="$gray600" isReadOnly />

            <Heading
              color="$gray200"
              fontSize="$md"
              fontFamily="$heading"
              alignSelf="flex-start"
              mb="$2"
              mt="$12"
            >
              Alterar Senha
            </Heading>

            <Input bg="$gray600" placeholder="Senha antiga" secureTextEntry />
            <Input bg="$gray600" placeholder="Nova Senha" secureTextEntry />
            <Input
              bg="$gray600"
              placeholder="Confirme a nova senha"
              secureTextEntry
            />

            <Button title="Atualizar" mt="$4" />
          </Center>
        </Center>
      </ScrollView>
    </VStack>
  )
}
