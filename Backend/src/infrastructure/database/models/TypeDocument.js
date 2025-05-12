const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const TypeDocument = sequelize.define('TypeDocument', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nameTypeDocument: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'name_type_document',
    },
  }, {
    tableName: 'type_document_tb',
    timestamps: false,
  });

  return TypeDocument;
};