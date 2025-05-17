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

export const profileSchema = yup.object({
  name: yup.string().required('Nome é obrigatório.'),
  oldPassword: yup
    .string()
    .transform((value) => value || null)
    .when('newPassword', {
      is: (value: string | null) => !!value,
      then: (schema) =>
        schema.required('Senha atual é obrigatória para alterar a senha.'),
      otherwise: (schema) => schema.nullable(),
    }),
  newPassword: yup
    .string()
    .min(6, 'A nova senha deve conter no mínimo 6 caracteres.')
    .nullable()
    .transform((value) => value || null),
  newPasswordConfirmation: yup
    .string()
    .transform((value) => value || null)
    .when('newPassword', {
      is: (value: string | null) => !!value,
      then: (schema) =>
        schema
          .required('Confirmação da nova senha é obrigatória.')
          .oneOf(
            [yup.ref('newPassword')],
            'A confirmação da senha deve ser igual à nova senha.',
          ),
      otherwise: (schema) => schema.nullable(),
    }),
})
