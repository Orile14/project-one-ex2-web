const session = require('express-session');
const express = require('express');
var app = express();


app.use(session({
    secret:'foo',
    saveUninitialized:false,
    resave:false
}));

const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.json());

const cors = require('cors');   
app.use(cors());

const customEnv = require('custom-env');
customEnv.env(process.env.NODE_ENV, './config');
console.log(process.env.CONNECTION_STRING);
console.log(process.env.PORT);
 
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTION_STRING);

app.use(express.static('public'));

const articles = require('./routes/article' );
app.use('/articles', articles);

const user = require('./routes/user');
app.use('/api/users', user);

const post = require('./routes/post');
app.use('/api/posts', post);

app.listen(process.env.PORT);

