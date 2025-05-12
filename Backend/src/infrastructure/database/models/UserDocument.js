const { DataTypes } = require('sequelize');

/**
 * Modelo para documentos de identificación de usuarios
 * @param {Object} sequelize - Instancia de Sequelize
 * @returns {Object} - Modelo UserDocument configurado
 */
module.exports = (sequelize) => {
  const UserDocument = sequelize.define('UserDocument', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id',
      references: {
        model: 'app_user_tb',
        key: 'id',
      },
    },
    document: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: 'document',
    },
    typeDocumentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'type_document_id',
      references: {
        model: 'type_document_tb',
        key: 'id',
      },
    },
    placeExpedition: {
      type: DataTypes.STRING(60),
      allowNull: true,
      field: 'place_expedition',
    },
    dateExpedition: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'date_expedition',
    },
  }, {
    tableName: 'user_document_tb',
    timestamps: false,
  });

  return UserDocument;
};