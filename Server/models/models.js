const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user',{
    phone: {type: DataTypes.BIGINT, primaryKey: true, unique:true},
    password: {type: DataTypes.STRING},
    surname: {type: DataTypes.STRING},
    name: {type: DataTypes.STRING},
    patronymic: {type: DataTypes.STRING},
    birthdate: {type: DataTypes.DATE},
    sexCode: {type: DataTypes.INTEGER},
    citizenshipCode: {type: DataTypes.INTEGER}
})

const Account = sequelize.define('account',{
    accountCode: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    phone: {type: DataTypes.BIGINT},
    balance: {type: DataTypes.FLOAT},
    valutaCode: {type: DataTypes.STRING}
})

const Valuta = sequelize.define('valuta',{
    valutaCode: {type: DataTypes.STRING, primaryKey: true, unique:true},
    name: {type: DataTypes.STRING},
    symbol: {type: DataTypes.STRING}
})

const OperationHistory = sequelize.define('operationhistory',{
    accountCode: {type: DataTypes.INTEGER, primaryKey: true},
    date: {type: DataTypes.STRING, primaryKey: true},
    sum: {type: DataTypes.FLOAT},
    adress: {type: DataTypes.INTEGER},
    type: {type: DataTypes.STRING}
})

User.hasMany(Account);
Account.belongsTo(User);

Account.hasMany(OperationHistory);
OperationHistory.belongsTo(Account);

Account.hasOne(Valuta);
Valuta.belongsTo(Account);

module.exports = {
    User,
    Account,
    OperationHistory,
    Valuta
}