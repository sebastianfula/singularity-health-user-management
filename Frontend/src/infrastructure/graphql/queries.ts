import { gql } from '@apollo/client';

// Consulta para obtener todos los tipos de documentos
export const GET_TYPE_DOCUMENTS = gql`
  query GetTypeDocuments {
    getTypeDocuments {
      id
      nameTypeDocument
    }
  }
`;

// Consulta para obtener todos los países
export const GET_COUNTRIES = gql`
  query GetCountries {
    getCountries {
      id
      countryName
      countryCode
    }
  }
`;

// Consulta para verificar si un usuario ya existe
export const CHECK_USER_EXISTS = gql`
  query CheckUserExists($username: String!, $email: String!, $document: String!) {
    checkUserExists(username: $username, email: $email, document: $document) {
      exists
      field
      message
    }
  }
`;

// Consulta para obtener un usuario por ID
export const GET_USER = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      lastName
      name
      isMilitar
      timeCreate
      isTemporal
      username
      email
      emailVerified
      documents {
        id
        document
        typeDocument {
          id
          nameTypeDocument
        }
        placeExpedition
        dateExpedition
      }
      contactInfo {
        id
        address
        country {
          id
          countryName
          countryCode
        }
        city
        phone
        celPhone
        emergencyName
        emergencyPhone
      }
    }
  }
`;