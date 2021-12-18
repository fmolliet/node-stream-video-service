const express = require('express');
const cors    = require('cors');
const path    = require('path');
const morgan  = require('morgan');
const dotenv  = require('dotenv').config();

const routes  = require('./routes');

const app     = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'static'));

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

//app.use(routes);

module.exports = app;