'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Crear tabla de países
    await queryInterface.createTable('country_tb', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      country_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      country_code: {
        type: Sequelize.STRING(4),
        allowNull: true,
      },
    });

    // Crear tabla de tipos de documentos
    await queryInterface.createTable('type_document_tb', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name_type_document: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
    });

    // Crear tabla de usuarios
    await queryInterface.createTable('app_user_tb', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      is_militar: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      time_create: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      is_temporal: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      email_verified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      verification_token: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });

    // Crear tabla de documentos de usuario
    await queryInterface.createTable('user_document_tb', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'app_user_tb',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      document: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      type_document_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'type_document_tb',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      place_expedition: {
        type: Sequelize.STRING(60),
        allowNull: true,
      },
      date_expedition: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    // Crear tabla de información de contacto
    await queryInterface.createTable('contact_info_tb', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'app_user_tb',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      address: {
        type: Sequelize.STRING(60),
        allowNull: true,
      },
      country_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'country_tb',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      city: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      phone: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      cel_phone: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      emergency_name: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      emergency_phone: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
    });

    // Insertar datos iniciales para tipos de documentos
    await queryInterface.bulkInsert('type_document_tb', [
      { name_type_document: 'Cédula de Ciudadanía' },
      { name_type_document: 'Tarjeta de Identidad' },
      { name_type_document: 'Pasaporte' },
      { name_type_document: 'Cédula de Extranjería' },
    ]);

    // Insertar datos iniciales para países
    await queryInterface.bulkInsert('country_tb', [
      { country_name: 'Colombia', country_code: 'CO' },
      { country_name: 'Estados Unidos', country_code: 'US' },
      { country_name: 'España', country_code: 'ES' },
      { country_name: 'México', country_code: 'MX' },
      { country_name: 'Argentina', country_code: 'AR' },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Eliminar tablas en orden inverso para respetar las restricciones de clave foránea
    await queryInterface.dropTable('contact_info_tb');
    await queryInterface.dropTable('user_document_tb');
    await queryInterface.dropTable('app_user_tb');
    await queryInterface.dropTable('type_document_tb');
    await queryInterface.dropTable('country_tb');
  }
};