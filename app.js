const express = require('express');
const { join } = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// modules
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

//setup
dotenv.config({
  encoding: "utf-8",
  debug: true,
  override: false,
});


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));
app.use(
  cors({
    allowedHeaders: true,
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    origin: "*",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

//routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
