import { useState } from 'react'
import { TouchableOpacity, ScrollView, Alert } from 'react-native'
import { Center, Heading, Text, VStack } from '@gluestack-ui/themed'
import { Controller, useForm } from 'react-hook-form'

import { Input } from '@components/Input'
import { ScreenHeader } from '@components/ScreenHeader'
import { UserPhoto } from '@components/UserPhoto'
import { Button } from '@components/Button'
import * as ImagePicker from 'expo-image-picker'
import { getInfoAsync } from 'expo-file-system'
import { useAuth } from '@hooks/useAuth'
import { ProfileFormData } from '@dtos/user'
import { isAppError } from '@utils/http'
import { yupResolver } from '@hookform/resolvers/yup'
import { profileSchema } from '@utils/validations'
import { patchAvatar, putProfile } from 'src/network/user'
import defaultProfilePhoto from '@assets/userPhotoDefault.png'

const PHOTO_SIZE_IN_MB = 5

export function ProfileScreen() {
  const [isPhotoLoading, setIsPhotoLoading] = useState(false)
  const [isUpdateProfileLoading, setIsUpdateProfileLoading] = useState(false)
  const { user, onUpdateUserProfile } = useAuth()

  const avatarSource = user?.avatarUri
    ? {
        uri: user.avatarUri,
      }
    : defaultProfilePhoto

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: user?.name,
      email: user?.email,
    },
    resolver: yupResolver(profileSchema),
  })

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
        const { uri, type } = selectedPhoto.assets[0]
        const photoInfo = await getInfoAsync(uri)
        if (photoInfo.size && photoInfo.size / 1024 / 1024 > PHOTO_SIZE_IN_MB) {
          return Alert.alert(
            'Imagem muito grande',
            `Escolha uma imagem de até ${PHOTO_SIZE_IN_MB}Mb`,
          )
        }

        const fileExtension = uri.split('.').pop()
        const avatarFile = {
          name: `${user?.name}.${fileExtension}`.toLowerCase(),
          uri,
          type: `${type}.${fileExtension}`,
        }

        const avatarFormData = new FormData()
        avatarFormData.append('avatar', avatarFile as any)

        const { avatar } = await patchAvatar(avatarFormData)
        user && (await onUpdateUserProfile({ ...user, avatar }))

        Alert.alert('Imagem atualizada com sucesso')
      }
    } catch (error) {
      if (isAppError(error)) {
        return Alert.alert(error.message)
      }
    } finally {
      setIsPhotoLoading(false)
    }
  }

  async function handleUpdateProfile({
    name,
    newPassword,
    oldPassword,
  }: ProfileFormData) {
    try {
      setIsUpdateProfileLoading(true)
      await putProfile({
        name,
        old_password: oldPassword,
        password: newPassword,
      })
      user && (await onUpdateUserProfile({ ...user, name }))

      Alert.alert('Perfil atualizado com sucesso')
    } catch (error) {
      if (isAppError(error)) {
        Alert.alert(error.message)
      }
    } finally {
      setIsUpdateProfileLoading(false)
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
            source={avatarSource}
            alt="Foto do usuário"
            w="$32"
            h="$32"
            isLoading={isPhotoLoading}
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
            <Controller
              control={control}
              name="name"
              render={({ field: { value, onChange } }) => (
                <Input
                  placeholder="Nome"
                  bg="$gray600"
                  value={value}
                  onChangeText={onChange}
                  error={errors.name?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({ field: { value, onChange } }) => (
                <Input
                  placeholder="Email"
                  bg="$gray600"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={value}
                  onChangeText={onChange}
                  isReadOnly
                />
              )}
            />

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

            <Controller
              control={control}
              name="oldPassword"
              render={({ field: { value, onChange } }) => (
                <Input
                  bg="$gray600"
                  placeholder="Senha antiga"
                  secureTextEntry
                  value={value}
                  onChangeText={onChange}
                  error={errors.oldPassword?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="newPassword"
              render={({ field: { value, onChange } }) => (
                <Input
                  bg="$gray600"
                  placeholder="Nova Senha"
                  secureTextEntry
                  value={value}
                  onChangeText={onChange}
                  error={errors.newPassword?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="newPasswordConfirmation"
              render={({ field: { value, onChange } }) => (
                <Input
                  bg="$gray600"
                  placeholder="Confirme a nova senha"
                  secureTextEntry
                  value={value}
                  onChangeText={onChange}
                  error={errors.newPasswordConfirmation?.message}
                  onSubmitEditing={handleSubmit(handleUpdateProfile)}
                />
              )}
            />

            <Button
              title="Atualizar"
              mt="$4"
              onPress={handleSubmit(handleUpdateProfile)}
              isLoading={isUpdateProfileLoading}
            />
          </Center>
        </Center>
      </ScrollView>
    </VStack>
  )
}
