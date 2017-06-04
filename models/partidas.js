// Definicion del modelo Partidas:

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Partidas',
        {
            date: {
                type: DataTypes.DATE
            },
            userId: {
                type: DataTypes.INTEGER
            },
            score: {
                type: DataTypes.INTEGER
            }
        });
};
