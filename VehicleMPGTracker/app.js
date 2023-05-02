var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session'); //new

var indexRouter = require('./routes/index');
var dashboardRouter = require('./routes/dashboard');
var fillUpRouter = require('./routes/fillup');
var fillUpHistoryRouter = require('./routes/filluphistory');
var logRouter = require('./routes/log');
var logHistoryRouter = require('./routes/loghistory');
var vehicleRouter = require('./routes/vehicle');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');


var app = express();
var MySQLStore = require("express-mysql-session")(session); //new


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//new
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use(express.static(path.join(__dirname, "node_modules/bootstrap-icons/")));
//--------------------
//run database connection and creation logic
var dbCon = require('./lib/database.js');
//--------------------

// Session management to store cookies in a MySQL server (this has a bug, so we assist it by creating the database for it)
var dbSessionPool = require("./lib/sessionPool.js");
var sessionStore = new MySQLStore({}, dbSessionPool);
// Necessary middleware to store session cookies in MySQL
app.use(
  session({
    key: "session_cookie_name",
    secret: "session_cookie_secret1234",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: "strict",
    },
  })
);

// Middleware to make session variables available in .ejs template files
app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});


app.use('/', indexRouter);
app.use('/dashboard', dashboardRouter);
app.use('/fillup', fillUpRouter);
app.use('/filluphistory', fillUpHistoryRouter);
app.use('/log', logRouter);
app.use('/loghistory', logHistoryRouter);
app.use('/vehicle', vehicleRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
