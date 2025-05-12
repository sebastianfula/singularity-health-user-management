const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

/**
 * Modelo de usuario de la aplicación
 * @param {Object} sequelize - Instancia de Sequelize
 * @returns {Object} - Modelo AppUser configurado
 */
module.exports = (sequelize) => {
  const AppUser = sequelize.define('AppUser', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: 'last_name',
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: 'name',
    },
    isMilitar: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'is_militar',
    },
    timeCreate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'time_create',
    },
    isTemporal: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'is_temporal',
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: 'username',
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'password',
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: 'email',
      validate: {
        isEmail: true,
      },
    },
    emailVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'email_verified', 
    },
    verificationToken: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'verification_token', 
    },
  }, {
    tableName: 'app_user_tb',
    timestamps: false,
    hooks: {
      /**
       * Hook para encriptar la contraseña antes de crear un usuario
       * @param {Object} user - Instancia del usuario a crear
       */
      beforeCreate: async (user) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
      /**
       * Hook para encriptar la contraseña antes de actualizar un usuario
       * @param {Object} user - Instancia del usuario a actualizar
       */
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
    },
  });

  /**
   * Método para validar la contraseña del usuario
   * @param {string} password - Contraseña a validar
   * @returns {Promise<boolean>} - True si la contraseña es válida
   */
  AppUser.prototype.validatePassword = async function(password) {
    return bcrypt.compare(password, this.password);
  };

  return AppUser;
};