import { useState } from 'react';
import { useMutation, useApolloClient } from '@apollo/client';
import { REGISTER_USER } from '../../infrastructure/graphql/mutations';
import { CHECK_USER_EXISTS } from '../../infrastructure/graphql/queries';
import type { RegisterUserInput } from '../../domain/models/User';
import { registerUserSchema } from '../../domain/models/validationSchemas';
import { ValidationError } from 'yup';
import { ServiceFactory } from '../../infrastructure/services/serviceFactory';

interface UseRegisterFormReturn {
  formData: RegisterUserInput;
  errors: Record<string, string>;
  responseMessage: { type: 'success' | 'error', text: string } | null;
  loading: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  resetForm: () => void;
}

export const useRegisterForm = (): UseRegisterFormReturn => {
  // Estado inicial del formulario
  const initialFormState: RegisterUserInput = {
    lastName: '',
    name: '',
    isMilitar: false,
    isTemporal: false,
    username: '',
    password: '',
    email: '',
    document: {
      document: '',
      typeDocumentId: '',
      placeExpedition: '',
      dateExpedition: ''
    },
    contactInfo: {
      address: '',
      countryId: '',
      city: '',
      phone: '',
      celPhone: '',
      emergencyName: '',
      emergencyPhone: ''
    }
  };

  // Estados
  const [formData, setFormData] = useState<RegisterUserInput>(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [responseMessage, setResponseMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Mutación para registrar usuario
  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    onCompleted: (data) => {
      if (data.registerUser.success) {
        setResponseMessage({ type: 'success', text: data.registerUser.message || 'Usuario registrado exitosamente' });
        resetForm();
      } else {
        setResponseMessage({ type: 'error', text: data.registerUser.message || 'Error al registrar usuario' });
      }
    },
    onError: (error) => {
      setResponseMessage({ type: 'error', text: error.message || 'Error en la conexión' });
    }
  });

  // Resetear formulario
  const resetForm = () => {
    setFormData(initialFormState);
    setErrors({});
  };

  // Manejar cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    // Manejar campos anidados
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof RegisterUserInput] as object),
          [child]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }
      }));
    } else {
      // Manejar campos de primer nivel
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
      }));
    }
    
    // Limpiar error cuando el usuario comienza a escribir
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Validar formulario usando Yup
  const validateForm = async (): Promise<boolean> => {
    try {
      // Validar con el esquema Yup
      await registerUserSchema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (error) {
      // Manejar errores de validación
      if (error instanceof ValidationError) {
        const newErrors: Record<string, string> = {};
        
        error.inner.forEach((err) => {
          if (err.path) {
            newErrors[err.path] = err.message;
          }
        });
        
        setErrors(newErrors);
      }
      return false;
    }
  };

  // Obtener cliente Apollo y servicios
  const apolloClient = useApolloClient();
  const serviceFactory = ServiceFactory.getInstance(apolloClient);
  const userService = serviceFactory.getUserService();

  // Verificar si el usuario ya existe con validación en tiempo real
  const checkDuplicateUser = async (): Promise<boolean> => {
    try {
      // Usar directamente la consulta GraphQL para mayor eficiencia
      const { data } = await apolloClient.query({
        query: CHECK_USER_EXISTS,
        variables: {
          username: formData.username,
          email: formData.email,
          document: formData.document.document
        },
        fetchPolicy: 'network-only' // Asegurar datos actualizados
      });

      if (data?.checkUserExists?.exists) {
        const { field, message } = data.checkUserExists;
        setErrors(prev => ({
          ...prev,
          [field]: message
        }));
        setResponseMessage({
          type: 'error',
          text: `Ya existe un usuario con este ${field === 'username' ? 'nombre de usuario' : 
                 field === 'email' ? 'correo electrónico' : 'número de documento'}`
        });
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error al verificar duplicados:', error);
      setResponseMessage({
        type: 'error',
        text: 'Error al verificar duplicados. Por favor, inténtelo de nuevo.'
      });
      return false;
    }
  };

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResponseMessage(null);
    
    const isValid = await validateForm();
    if (isValid) {
      // Verificar duplicados antes de enviar
      const noDuplicates = await checkDuplicateUser();
      
      if (noDuplicates) {
        try {
          registerUser({
            variables: {
              input: formData
            }
          });
        } catch (error) {
          setResponseMessage({ 
            type: 'error', 
            text: 'Error al conectar con el servidor. Por favor, inténtelo de nuevo más tarde.' 
          });
        }
      }
    }
  };

  return {
    formData,
    errors,
    responseMessage,
    loading,
    handleChange,
    handleSubmit,
    resetForm
  };
};