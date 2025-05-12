const { gql } = require('apollo-server-express');

/**
 * Definición de tipos para GraphQL
 * Incluye tipos principales, inputs y operaciones disponibles
 */
const typeDefs = gql`
  # Tipos principales
  type AppUser {
    id: ID!
    lastName: String!
    name: String!
    isMilitar: Boolean!
    timeCreate: String!
    isTemporal: Boolean!
    username: String!
    email: String!
    emailVerified: Boolean!
    documents: [UserDocument]
    contactInfo: [ContactInfo]
  }

  type UserDocument {
    id: ID!
    document: String!
    typeDocument: TypeDocument!
    placeExpedition: String
    dateExpedition: String
  }

  type TypeDocument {
    id: ID!
    nameTypeDocument: String!
  }

  type ContactInfo {
    id: ID!
    address: String
    country: Country!
    city: String
    phone: String
    celPhone: String
    emergencyName: String
    emergencyPhone: String
  }

  type Country {
    id: ID!
    countryName: String!
    countryCode: String
  }

  # Inputs para creación y actualización
  input UserDocumentInput {
    document: String!
    typeDocumentId: ID!
    placeExpedition: String
    dateExpedition: String
  }

  input ContactInfoInput {
    address: String
    countryId: ID!
    city: String
    phone: String
    celPhone: String
    emergencyName: String
    emergencyPhone: String
  }

  input RegisterUserInput {
    lastName: String!
    name: String!
    isMilitar: Boolean
    isTemporal: Boolean
    username: String!
    password: String!
    email: String!
    document: UserDocumentInput!
    contactInfo: ContactInfoInput!
  }

  # Respuestas
  type RegisterResponse {
    success: Boolean!
    message: String
    user: AppUser
  }

  # Respuesta para verificación de usuario existente
  type CheckUserExistsResponse {
    exists: Boolean!
    field: String
    message: String
  }

  # Queries
  type Query {
    getUser(id: ID!): AppUser
    getUsers: [AppUser]
    getTypeDocuments: [TypeDocument]
    getCountries: [Country]
    checkUserExists(username: String!, email: String!, document: String!): CheckUserExistsResponse
  }

  # Mutations
  type Mutation {
    registerUser(input: RegisterUserInput!): RegisterResponse!
  }
`;

module.exports = { typeDefs };