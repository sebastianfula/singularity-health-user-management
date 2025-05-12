import * as yup from 'yup';

// Esquema de validación para el formulario de registro de usuarios
export const registerUserSchema = yup.object().shape({
  lastName: yup.string().required('El apellido es obligatorio'),
  name: yup.string().required('El nombre es obligatorio'),
  isMilitar: yup.boolean(),
  isTemporal: yup.boolean(),
  username: yup
    .string()
    .required('El nombre de usuario es obligatorio')
    .min(4, 'El nombre de usuario debe tener al menos 4 caracteres'),
  password: yup
    .string()
    .required('La contraseña es obligatoria')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/,
      'La contraseña debe contener al menos una letra mayúscula, una minúscula y un número'
    ),
  email: yup
    .string()
    .required('El correo electrónico es obligatorio')
    .email('El formato del correo electrónico no es válido'),
  document: yup.object().shape({
    document: yup.string().required('El número de documento es obligatorio'),
    typeDocumentId: yup.string().required('El tipo de documento es obligatorio'),
    placeExpedition: yup.string(),
    dateExpedition: yup.date()
      .max(new Date(), 'La fecha de expedición no puede ser mayor a la fecha actual')
      .typeError('Debe seleccionar una fecha válida')
  }),
  contactInfo: yup.object().shape({
    address: yup.string(),
    countryId: yup.string().required('El país es obligatorio'),
    city: yup.string(),
    phone: yup.string(),
    celPhone: yup.string(),
    emergencyName: yup.string(),
    emergencyPhone: yup.string()
  })
});