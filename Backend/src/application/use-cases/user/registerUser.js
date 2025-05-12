const { models, sequelize } = require('../../../infrastructure/database/config');
const { Op } = require('sequelize');

/**
 * Caso de uso para registrar un nuevo usuario con su documento y contacto
 * @param {Object} userData - Datos del usuario a registrar
 * @param {string} userData.lastName - Apellido del usuario
 * @param {string} userData.name - Nombre del usuario
 * @param {boolean} userData.isMilitar - Indica si el usuario es militar
 * @param {boolean} userData.isTemporal - Indica si el usuario es temporal
 * @param {string} userData.username - Nombre de usuario único
 * @param {string} userData.password - Contraseña del usuario
 * @param {string} userData.email - Correo electrónico del usuario
 * @param {Object} userData.document - Información del documento del usuario
 * @param {Object} userData.contactInfo - Información de contacto del usuario
 * @returns {Promise<Object>} - Usuario registrado
 */
async function registerUserUseCase(userData) {
  // Validar que el usuario no exista previamente por username o email
  const existingUser = await models.AppUser.findOne({
    where: {
      [Op.or]: [
        { username: userData.username },
        { email: userData.email }
      ]
    },
    raw: true
  });

  if (existingUser) {
    throw new Error('Ya existe un usuario con ese nombre de usuario o correo electrónico');
  }

  // Validar que el documento no esté duplicado
  const existingDocument = await models.UserDocument.findOne({
    where: { document: userData.document.document }
  });

  if (existingDocument) {
    throw new Error('Ya existe un usuario con ese número de documento');
  }

  // Iniciar transacción para garantizar la integridad de los datos
  const transaction = await sequelize.transaction();

  try {
    // 1. Crear el usuario
    const user = await models.AppUser.create({
      lastName: userData.lastName,
      name: userData.name,
      isMilitar: userData.isMilitar || false,
      isTemporal: userData.isTemporal || false,
      username: userData.username,
      password: userData.password,
      email: userData.email,
      emailVerified: false,
      verificationToken: Math.random().toString(36).substring(2, 15),
      timeCreate: new Date()
    }, { transaction });

    // 2. Crear el documento del usuario
    await models.UserDocument.create({
      userId: user.id,
      document: userData.document.document,
      typeDocumentId: userData.document.typeDocumentId,
      placeExpedition: userData.document.placeExpedition,
      dateExpedition: userData.document.dateExpedition
    }, { transaction });

    // 3. Crear la información de contacto
    await models.ContactInfo.create({
      userId: user.id,
      address: userData.contactInfo.address,
      countryId: userData.contactInfo.countryId,
      city: userData.contactInfo.city,
      phone: userData.contactInfo.phone,
      celPhone: userData.contactInfo.celPhone,
      emergencyName: userData.contactInfo.emergencyName,
      emergencyPhone: userData.contactInfo.emergencyPhone
    }, { transaction });

    // Confirmar la transacción
    await transaction.commit();

    // Retornar el usuario creado (sin la contraseña)
    const userCreated = user.toJSON();
    delete userCreated.password;
    delete userCreated.verificationToken;
    
    return userCreated;
  } catch (error) {
    // Revertir la transacción en caso de error
    await transaction.rollback();
    throw error;
  }
}

module.exports = { registerUserUseCase };