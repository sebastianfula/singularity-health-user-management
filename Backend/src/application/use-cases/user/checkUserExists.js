const { models } = require('../../../infrastructure/database/config');
const { Op } = require('sequelize');

/**
 * Caso de uso para verificar si un usuario ya existe por username, email o documento
 * @param {string} username - Nombre de usuario a verificar
 * @param {string} email - Correo electrónico a verificar
 * @param {string} document - Número de documento a verificar
 * @returns {Promise<Object>} - Resultado de la verificación
 */
async function checkUserExistsUseCase(username, email, document) {
  // Verificar si existe un usuario con el mismo nombre de usuario
  const existingUsername = await models.AppUser.findOne({
    where: { username },
    raw: true
  });

  if (existingUsername) {
    return {
      exists: true,
      field: 'username',
      message: 'Ya existe un usuario con este nombre de usuario'
    };
  }

  // Verificar si existe un usuario con el mismo correo electrónico
  const existingEmail = await models.AppUser.findOne({
    where: { email },
    raw: true
  });

  if (existingEmail) {
    return {
      exists: true,
      field: 'email',
      message: 'Ya existe un usuario con este correo electrónico'
    };
  }

  // Verificar si existe un usuario con el mismo número de documento
  const existingDocument = await models.UserDocument.findOne({
    where: { document },
    raw: true
  });

  if (existingDocument) {
    return {
      exists: true,
      field: 'document',
      message: 'Ya existe un usuario con este número de documento'
    };
  }

  // Si no existe ningún usuario con esos datos, retornar que no existe
  return {
    exists: false,
    field: '',
    message: ''
  };
}

module.exports = { checkUserExistsUseCase };