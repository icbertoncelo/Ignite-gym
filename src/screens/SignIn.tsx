import { Center, Heading, Image, Text, VStack } from '@gluestack-ui/themed'
import { useNavigation } from '@react-navigation/native'

import BackgroundImg from '@assets/background.png'
import LogoSvg from '@assets/logo.svg'
import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'
import { ScrollView } from 'react-native'

export function SignIn() {
  const { navigate } = useNavigation<AuthNavigatorRoutesProps>()

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
            <Input
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input placeholder="Senha" secureTextEntry />

            <Button title="Acessar" />
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
