/**
 * Resolvers para GraphQL
 * Importación de casos de uso necesarios para las operaciones
 */
const { registerUserUseCase } = require('../../application/use-cases/user/registerUser');
const { getUserUseCase } = require('../../application/use-cases/user/getUser');
const { getUsersUseCase } = require('../../application/use-cases/user/getUsers');
const { getTypeDocumentsUseCase } = require('../../application/use-cases/typeDocument/getTypeDocuments');
const { getCountriesUseCase } = require('../../application/use-cases/country/getCountries');
const { checkUserExistsUseCase } = require('../../application/use-cases/user/checkUserExists');

/**
 * Configuración de resolvers para GraphQL
 */
const resolvers = {
  /**
   * Consultas disponibles en la API
   */
  Query: {
    getUser: async (_, { id }) => {
      return await getUserUseCase(id);
    },
    getUsers: async () => {
      return await getUsersUseCase();
    },
    getTypeDocuments: async () => {
      return await getTypeDocumentsUseCase();
    },
    getCountries: async () => {
      return await getCountriesUseCase();
    },
    checkUserExists: async (_, { username, email, document }) => {
      return await checkUserExistsUseCase(username, email, document);
    },
  },
  /**
   * Mutaciones disponibles en la API
   */
  Mutation: {
    registerUser: async (_, { input }) => {
      try {
        const user = await registerUserUseCase(input);
        return {
          success: true,
          message: 'Usuario registrado exitosamente',
          user,
        };
      } catch (error) {
        return {
          success: false,
          message: error.message,
          user: null,
        };
      }
    },
  },
  /**
   * Resolvers para el tipo AppUser
   */
  AppUser: {
    documents: async (parent) => {
      // Resolver para obtener los documentos de un usuario
      const { models } = require('../../infrastructure/database/config');
      return await models.UserDocument.findAll({
        where: { userId: parent.id },
        include: [{ model: models.TypeDocument }],
      });
    },
    contactInfo: async (parent) => {
      // Resolver para obtener la información de contacto de un usuario
      const { models } = require('../../infrastructure/database/config');
      return await models.ContactInfo.findAll({
        where: { userId: parent.id },
        include: [{ model: models.Country }],
      });
    },
  },
  UserDocument: {
    typeDocument: async (parent) => {
      // Resolver para obtener el tipo de documento
      const { models } = require('../../infrastructure/database/config');
      return await models.TypeDocument.findByPk(parent.typeDocumentId);
    },
  },
  ContactInfo: {
    country: async (parent) => {
      // Resolver para obtener el país
      const { models } = require('../../infrastructure/database/config');
      return await models.Country.findByPk(parent.countryId);
    },
  },
};

module.exports = { resolvers };