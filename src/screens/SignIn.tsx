import { Center, Heading, Image, Text, VStack } from 'native-base'
import { useNavigation } from '@react-navigation/native'

import BackgroundImg from '@assets/background.png'
import LogoSvg from '@assets/logo.svg'
import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'

export function SignIn() {
  const { navigate } = useNavigation<AuthNavigatorRoutesProps>()

  return (
    <VStack flex={1} px={10} pb={10} safeArea>
      <Image
        source={BackgroundImg}
        defaultSource={BackgroundImg}
        alt="Two people training on an exercise bike"
        resizeMode="contain"
        position="absolute"
      />

      <Center my={24}>
        <LogoSvg />
        <Text color="gray.100" fontSize="sm">
          Treine sua mente e o seu corpo
        </Text>
      </Center>

      <Center>
        <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
          Acesse sua conta
        </Heading>
        <Input
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Input placeholder="Senha" secureTextEntry />

        <Button title="Acessar" />
      </Center>

      <Center marginTop="auto">
        <Text color="gray.100" fontFamily="body" fontSize="sm" mb={3}>
          Ainda não tem acesso?
        </Text>
        <Button
          title="Criar conta"
          variant="outline"
          onPress={() => navigate('signUp')}
        />
      </Center>
    </VStack>
  )
}
