const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    "webwallet",
    "postgres",
    "root",
    {
        logging: false,
        dialect: 'postgres',
        host: "postgres",
        port: "5432"
    }
)