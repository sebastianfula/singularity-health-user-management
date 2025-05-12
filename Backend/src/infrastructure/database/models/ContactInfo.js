const { DataTypes } = require('sequelize');

/**
 * Modelo para información de contacto de usuarios
 * @param {Object} sequelize - Instancia de Sequelize
 * @returns {Object} - Modelo ContactInfo configurado
 */
module.exports = (sequelize) => {
  const ContactInfo = sequelize.define('ContactInfo', {
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
    address: {
      type: DataTypes.STRING(60),
      allowNull: true,
      field: 'address',
    },
    countryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'country_id',
      references: {
        model: 'country_tb',
        key: 'id',
      },
    },
    city: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'city',
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'phone',
    },
    celPhone: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'cel_phone',
    },
    emergencyName: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'emergency_name',
    },
    emergencyPhone: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'emergency_phone',
    },
  }, {
    tableName: 'contact_info_tb',
    timestamps: false,
  });

  return ContactInfo;
};