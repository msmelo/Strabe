const express = require('express');
const path = require('path');
//const favicon = require('serve-favicon');
//const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

global.logger = require('winston');
logger.remove(logger.transports.Console)
logger.add(logger.transports.Console, { colorize: true });
logger.level = 'debug';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//app.use(morgan('dev'));
//app.use(morgan(':date[clf] - :method :url :status :response-time ms - :res[content-length]'))

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//Routes
require('./routes/index.js')(app);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
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