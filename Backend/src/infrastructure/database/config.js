const { Sequelize } = require('sequelize');

/**
 * Configuración de la conexión a la base de datos MySQL
 */
const sequelize = new Sequelize(
  process.env.DB_NAME || 'gestion_usuarios',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || 'root',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    define: {
      timestamps: true,
      underscored: true
    },
  }
);

// Modelos de la base de datos
const AppUser = require('./models/AppUser')(sequelize);
const UserDocument = require('./models/UserDocument')(sequelize);
const TypeDocument = require('./models/TypeDocument')(sequelize);
const ContactInfo = require('./models/ContactInfo')(sequelize);
const Country = require('./models/Country')(sequelize);

// Definir relaciones entre modelos

// Relación entre AppUser y UserDocument
AppUser.hasMany(UserDocument, { foreignKey: 'userId' });
UserDocument.belongsTo(AppUser, { foreignKey: 'userId' });

// Relación entre TypeDocument y UserDocument
TypeDocument.hasMany(UserDocument, { foreignKey: 'typeDocumentId' });
UserDocument.belongsTo(TypeDocument, { foreignKey: 'typeDocumentId' });

// Relación entre AppUser y ContactInfo
AppUser.hasMany(ContactInfo, { foreignKey: 'userId' });
ContactInfo.belongsTo(AppUser, { foreignKey: 'userId' });

// Relación entre Country y ContactInfo
Country.hasMany(ContactInfo, { foreignKey: 'countryId' });
ContactInfo.belongsTo(Country, { foreignKey: 'countryId' });

module.exports = {
  sequelize,
  models: {
    AppUser,
    UserDocument,
    TypeDocument,
    ContactInfo,
    Country,
  },
};