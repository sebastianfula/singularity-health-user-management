const { models } = require('../../../infrastructure/database/config');

/**
 * Caso de uso para obtener todos los países
 * @returns {Promise<Array>} - Lista de países
 */
async function getCountriesUseCase() {
  return await models.Country.findAll();
}

module.exports = { getCountriesUseCase };