const express = require('express'),
  app = express(),
  fs = require('fs');

const { use } = require('express/lib/application');
const sequelize = require('./db')
const models = require('./models/models')
let bodyParser = require('body-parser')
const port = 3000

app.use(express.static('img'));
app.use(bodyParser.json());

app.options("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, siteHolder');
    res.sendStatus(200);
});

app.get('/login', (req, res) => { //sql

    models.User.findOne({where:{phone: req.query['phone']}})
    .then(user=>{
        if(user == null){
            res.setHeader('Access-Control-Allow-Origin', '*');
            return res
            .json({"status" : false});
        }
        let status = false;
        if(user.password == req.query['password'])
        status = true;

        res.setHeader('Access-Control-Allow-Origin', '*');
        return res
        .json({"status" : status});
    })
    .catch(e=> console.log(e))
    
})

app.get('/registration', (req, res) => { //sql

    models.User.create({
        phone: req.query['phone'],
        password: req.query['password'],
        surname: req.query['surname'],
        name: req.query['name'],
        patronymic: req.query['patronymic'],
        birthdate: req.query['birthdate'],
        sexCode: req.query['sexCode'],
        citizenshipCode: req.query['citizenshipCode']
    })
    .then(r => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        return res
        .sendStatus(201)
    })
    .catch(err=>{console.log(err); res.setHeader('Access-Control-Allow-Origin', '*');  return res.sendStatus(400)});

    
    
    
})

app.get('/registration/exist', (req, res) => { //sql
    models.User.findAll({where:{phone: req.query['phone']}, raw: true })
    .then(users=>{
        let response = true;
        if(users.length == 0){
            response = false;
        }
        res.setHeader('Access-Control-Allow-Origin', '*');
        return res
        .json({"status" : response});
    }).catch(err=>console.log(err));
})

app.get('/hub', (req, res) => { //sql

    models.Account.findAll({where:{phone : req.query['phone']}, order: ['accountCode']})
    .then(accounts=>{
        const time = setTimeout(() => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            return res
            .json({"data" : accounts});
        }, 500);
    })
})

app.get('/valuta', (req, res) => {

    /*models.Valuta.findAll()
    .then(valuta =>{
        console.log(valuta[0].name);
    })*/

    const valutaData = require('./Data/valuta.json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res
    .json({"data" : valutaData});
})

app.get('/topUp', (req, res) => {

    models.Account.findOne({where:{accountCode: req.query['accountCode']}})
    .then(acc=>{
        models.Account.update({balance: acc.balance + 1000}, {where: {accountCode: req.query['accountCode']}})
        .then(valuta =>{
            models.OperationHistory.create({
                accountCode: req.query['accountCode'],
                date: Date.now(),
                sum: 1000,
                type: 'Зачисление'
            })
            res.setHeader('Access-Control-Allow-Origin', '*');
            return res
            .sendStatus(200)
        })
    })
})

app.get('/create-account', (req, res) => { //sql

    models.Account.create({
        phone: req.query['phone'],
        balance: 0,
        valutaCode: req.query['valuta']
    })
    .then(u=>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        return res 
        .sendStatus(201);
    })
    .catch(e=>{
        console.log(e);
        res.setHeader('Access-Control-Allow-Origin', '*');
        return res
        .sendStatus(400);
    })
})

app.get('/checkAdress', (req, res) => { //sql
    models.Account.findAll({
        where: {accountCode: req.query['accountCode']}
    })
    .then(u=>{
        let data = true;
        if(u.length == 0) data = false;
        res.setHeader('Access-Control-Allow-Origin', '*');
        return res
        .json({'data': data});
    })
    .catch(e=>{
        console.log(e);
        res.setHeader('Access-Control-Allow-Origin', '*');
        return res
        .json({'data': false});
})})

app.get('/checkBalance', (req, res) => { //sql
    models.Account.findOne({
        where: {accountCode: req.query['accountCode']}
    })
    .then(u=>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        return res
        .json({'data': u.balance});
    })
    .catch(e=>{
        console.log(e);
        res.setHeader('Access-Control-Allow-Origin', '*');
        return res
        .json({'data': false});
})})

app.get('/operation-history', (req, res) =>{
    const account = req.query['accountCode'];

    models.OperationHistory.findAll({ where: {accountCode: req.query['accountCode']}, order : [['date', 'DESC']]})
    .then(hist=>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        return res
        .json({'data': hist});
    })
})

app.get('/getAccountValuta', (req, res) =>{
    const account = req.query['accountCode'];
    const valutaData = require('./Data/valuta.json');

    models.Account.findOne({ where: {accountCode: account}})
    .then(hist=>{
        const vCode = hist.valutaCode;
        const data = {'symbol': valutaData[vCode].symbol, 'name': valutaData[vCode].name};
        res.setHeader('Access-Control-Allow-Origin', '*');
        return res
        .json({"data": data});
    })
})

app.post('/transaction', (req, res) => { //sql
    let account = req.body.account, adress = req.body.adress, sum = Math.round(req.body.sum*100)/100, valutaData = req.body.valuta.rates, accountValuta = "", adressValuta="", adressSum = sum, dateOfOp = Date.now();

    valutaData['RUB'] = 1;

    models.Account.findOne({where:{accountCode: account}})
    .then(acc=>{
        accountValuta = acc.valutaCode;

        models.Account.update({balance: Math.round((acc.balance - sum)*100)/100}, {where: {accountCode: account}})
        .then(val=>{
            models.Account.findOne({where:{accountCode: adress}})
            .then(acc=>{
                adressValuta = acc.valutaCode;

                adressSum = Math.round(adressSum/valutaData[accountValuta]*valutaData[adressValuta]*100)/100;
                models.Account.update({balance: Math.round((+acc.balance + (+adressSum))*100)/100}, {where: {accountCode: adress}})
                .then(valuta =>{
                    models.OperationHistory.create({
                        accountCode: account,
                        date: dateOfOp,
                        sum: sum,
                        adress: adress,
                        type: 'Снятие'
                    })
                    models.OperationHistory.create({
                        accountCode: adress,
                        date: dateOfOp,
                        sum: adressSum,
                        adress: account,
                        type: 'Зачисление'
                    })
                })
            })
        })

        
    })
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res
    .sendStatus(200);
})

const start = async () =>{
    try{
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(port, () => console.log(`Server listens http://localhost:${port}`)
        
)
    } catch(e){
        console.log(e);
    }
}

start();

