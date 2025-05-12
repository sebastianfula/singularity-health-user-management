const { models } = require('../../../infrastructure/database/config');

/**
 * Caso de uso para obtener un usuario por su ID
 * Este caso de uso busca un usuario específico y elimina información sensible
 * @param {number} id - ID del usuario a buscar
 * @returns {Promise<Object>} - Usuario encontrado sin datos sensibles
 * @throws {Error} - Si el usuario no existe
 */
async function getUserUseCase(id) {
  const user = await models.AppUser.findByPk(id);
  
  if (!user) {
    throw new Error('Usuario no encontrado');
  }
  
  // Eliminar información sensible antes de devolver el usuario
  const userJson = user.toJSON();
  delete userJson.password;
  delete userJson.verificationToken;
  
  return userJson;
}

module.exports = { getUserUseCase };