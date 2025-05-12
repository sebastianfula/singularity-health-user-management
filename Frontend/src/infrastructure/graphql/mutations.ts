import { gql } from '@apollo/client';

// Mutación para registrar un nuevo usuario
export const REGISTER_USER = gql`
  mutation RegisterUser($input: RegisterUserInput!) {
    registerUser(input: $input) {
      success
      message
      user {
        id
        lastName
        name
        isMilitar
        timeCreate
        isTemporal
        username
        email
        emailVerified
      }
    }
  }
`;