import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ScrollView, Alert } from 'react-native'
import { Center, Heading, Image, Text, VStack } from '@gluestack-ui/themed'
import { useNavigation } from '@react-navigation/native'

import BackgroundImg from '@assets/background.png'
import LogoSvg from '@assets/logo.svg'
import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'
import { useAuth } from '@hooks/useAuth'
import { isAppError } from '@utils/http'
import { yupResolver } from '@hookform/resolvers/yup'
import { signInSchema } from '@utils/validations'
import { SignInFormData } from '@dtos/sign'

export function SignIn() {
  const { navigate } = useNavigation<AuthNavigatorRoutesProps>()
  const { signIn } = useAuth()
  const [isAuthLoading, setIsAuthLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({ resolver: yupResolver(signInSchema) })

  async function handleSignIn({ email, password }: SignInFormData) {
    try {
      setIsAuthLoading(true)
      await signIn({ email, password })
    } catch (error) {
      if (isAppError(error)) {
        return Alert.alert(error.message)
      }
    } finally {
      setIsAuthLoading(false)
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} bg="$gray700">
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="Two people training on an exercise bike"
          w="$full"
          h={624}
          position="absolute"
        />

        <VStack flex={1} px="$10" pb="$16">
          <Center my="$24">
            <LogoSvg />
            <Text color="$gray100" fontSize="$sm">
              Treine sua mente e o seu corpo
            </Text>
          </Center>

          <Center gap="$2">
            <Heading
              color="$gray100"
              fontSize="$xl"
              mb="$6"
              fontFamily="$heading"
            >
              Acesse sua conta
            </Heading>
            <Controller
              control={control}
              name="email"
              render={({ field: { value, onChange } }) => (
                <Input
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={value}
                  onChangeText={onChange}
                  error={errors.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { value, onChange } }) => (
                <Input
                  placeholder="Senha"
                  secureTextEntry
                  returnKeyType="send"
                  value={value}
                  onChangeText={onChange}
                  onSubmitEditing={handleSubmit(handleSignIn)}
                  error={errors.password?.message}
                />
              )}
            />

            <Button
              title="Acessar"
              onPress={handleSubmit(handleSignIn)}
              isLoading={isAuthLoading}
            />
          </Center>

          <Center flex={1} justifyContent="flex-end" mt="$4">
            <Text color="$gray100" fontFamily="$body" fontSize="$sm" mb="$3">
              Ainda não tem acesso?
            </Text>
            <Button
              title="Criar conta"
              variant="outline"
              onPress={() => navigate('signUp')}
            />
          </Center>
        </VStack>
      </VStack>
    </ScrollView>
  )
}
