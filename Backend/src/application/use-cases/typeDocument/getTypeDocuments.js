const { models } = require('../../../infrastructure/database/config');

/**
 * Caso de uso para obtener todos los tipos de documentos
 * @returns {Promise<Array>} - Lista de tipos de documentos
 */
async function getTypeDocumentsUseCase() {
  return await models.TypeDocument.findAll();
}

module.exports = { getTypeDocumentsUseCase };