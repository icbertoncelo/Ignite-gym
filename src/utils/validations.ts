import * as yup from 'yup'

export const signInSchema = yup.object({
  email: yup.string().required('Email obrigatório').email('Email inválido.'),
  password: yup
    .string()
    .required('Senha obrigatória.')
    .min(6, 'Senha deve conter um mínimo de 6 caracteres.'),
})

export const signUpSchema = yup.object({
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
