'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.createTable(
          'Partidas',
          {
              id: {
                  type: Sequelize.INTEGER,
                  allowNull: false,
                  primaryKey: true,
                  autoIncrement: true,
                  unique: true
              },
              userId: {
                  type: Sequelize.INTEGER
              },
              score: {
                  type: Sequelize.INTEGER
              },
              date: {
                  type: Sequelize.DATE
              },
              createdAt: {
                  type: Sequelize.DATE,
                  allowNull: false
              },
              updatedAt: {
                  type: Sequelize.DATE,
                  allowNull: false
              }
          }

      );
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.dropTable('Partidas');
  }
};
