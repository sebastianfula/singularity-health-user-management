const { models } = require('../../../infrastructure/database/config');

/**
 * Caso de uso para obtener todos los usuarios
 * Este caso de uso recupera todos los usuarios y elimina información sensible
 * @returns {Promise<Array>} - Lista de usuarios sin datos sensibles
 */
async function getUsersUseCase() {
  const users = await models.AppUser.findAll();
  
  // Eliminar información sensible de cada usuario antes de devolverlos
  return users.map(user => {
    const userJson = user.toJSON();
    delete userJson.password;
    delete userJson.verificationToken;
    return userJson;
  });
}

module.exports = { getUsersUseCase };