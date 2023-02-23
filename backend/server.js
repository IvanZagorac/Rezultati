let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let morgan = require('morgan');
let path = require('path');
const mongoose = require('mongoose');
let bcrypt=require('bcrypt');
mongoose.set('strictQuery', true);

let config = require('./config/config')
const user=require('./schema/user');
const sport=require('./schema/sport');
const league=require('./schema/league');
const club=require('./schema/club');
const result=require('./schema/result');

let init = async () => {

    try {
        await mongoose.connect(config.pool, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const db =  await mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
            console.log('Connected to MongoDB');
        });

        initServer();
    } catch (e) {
        console.log(e)
        console.error('Problem connecting to database');
    }


};

let initServer = () => {

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(express.static(__dirname+'/public'));

    app.use(function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST,DELETE,PATCH');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \ Authorization');
        next();
    });

    app.use(morgan('dev'));
    //express,user, db, jwt, secret, bcrypt
    let authRouter = require('./app/authenticate-router')(express,user);
    app.use('/auth', authRouter);
    let userRouter = require('./app/user-router')(express,user);
    app.use('/users', userRouter);
    let registerRouter = require('./app/register-router')(express,user);
    app.use('/register',registerRouter );
    let sportRouter = require('./app/sport-router')(express,sport,user);
    app.use('/sports', sportRouter);
    let leagueRouter = require('./app/league-router')(express,league,sport);
    app.use('/leagues', leagueRouter);
    let clubRouter = require('./app/club-router')(express,club,league);
    app.use('/club', clubRouter);
    let resultRouter = require('./app/result-router')(express,result,club);
    app.use('/results', resultRouter);




    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname + '/public/index.html'));
    });


    app.listen(config.port);

    console.log('Running on port ' + config.port);
};

init()














