const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Country = sequelize.define('Country', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    countryName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'country_name',
    },
    countryCode: {
      type: DataTypes.STRING(5),
      allowNull: true,
      field: 'country_code',
    },
  }, {
    tableName: 'country_tb',
    timestamps: false,
  });

  return Country;
};