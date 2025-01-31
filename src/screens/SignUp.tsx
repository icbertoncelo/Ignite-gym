import { Center, Heading, Image, Text, VStack } from '@gluestack-ui/themed'
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import BackgroundImg from '@assets/background.png'
import LogoSvg from '@assets/logo.svg'
import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { ScrollView } from 'react-native'

interface SignUpFormData {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

const signUpSchema = yup.object({
  name: yup.string().required('Nome obrigatório.'),
  email: yup.string().required('Email obrigatório').email('Email inválido.'),
  password: yup
    .string()
    .required('Senha obrigatória.')
    .min(6, 'Senha deve conter um mínimo de 6 caracteres.'),
  passwordConfirmation: yup
    .string()
    .required('Confirmação de senha obrigatório.')
    .oneOf([yup.ref('password')], 'A confirmação da senha deve ser igual'),
})

export function SignUp() {
  const { goBack } = useNavigation()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    resolver: yupResolver(signUpSchema),
  })

  function handleSignUp(data: SignUpFormData) {
    console.log(data)
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
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

          <Center flex={1} gap="$2">
            <Heading
              color="$gray100"
              fontSize="$xl"
              mb="$6"
              fontFamily="$heading"
            >
              Crie sua conta
            </Heading>
            <Controller
              control={control}
              name="name"
              render={({ field: { value, onChange } }) => (
                <Input
                  placeholder="Nome"
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
                  value={value}
                  onChangeText={onChange}
                  error={errors.password?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="passwordConfirmation"
              render={({ field: { value, onChange } }) => (
                <Input
                  placeholder="Confirme a senha"
                  secureTextEntry
                  returnKeyType="send"
                  value={value}
                  onChangeText={onChange}
                  onSubmitEditing={handleSubmit(handleSignUp)}
                  error={errors.passwordConfirmation?.message}
                />
              )}
            />

            <Button
              title="Criar e acessar"
              onPress={handleSubmit(handleSignUp)}
            />
          </Center>

          <Button
            title="Voltar para o login"
            variant="outline"
            mt={12}
            onPress={() => goBack()}
          />
        </VStack>
      </VStack>
    </ScrollView>
  )
}
