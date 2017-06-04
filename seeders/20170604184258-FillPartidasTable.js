'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.bulkInsert('Partidas', [
          {
              userId: 2,
              score: '3',
              date: new Date(),
              createdAt: new Date(),
              updatedAt: new Date()
          },
          {
              userId: 2,
              score: '3',
              date: new Date(),
              createdAt: new Date(),
              updatedAt: new Date()
          },
          {
              userId: 1,
              score: '100',
              date: new Date(),
              createdAt: new Date(),
              updatedAt: new Date()
          }
      ]);
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
