
require('dotenv').config()

const headers = require('./middlewares/headers');
const serverHost = require('./middlewares/serverHost');
const authorization = require('./middlewares/authorization');
const cors = require('cors');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const SocketServer = require('./socketServer');
const { ExpressPeerServer } = require('peer');
const Sequelize = require('sequelize');
const db = require('./models');
const cookieParser = require('cookie-parser');

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const commentRouter = require('./routes/comment');
const notifyRouter = require('./routes/notify');
const messageRouter = require('./routes/message');

const app = express();

app.use(cookieParser());
app.use(logger('dev'));
app.use(express.json());
app.use(express.static('public'))
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(headers)
app.use(serverHost)
app.use(authorization)


app.use('/api', authRouter);
app.use('/api', userRouter);
app.use('/api', postRouter);
app.use('/api', commentRouter);
app.use('/api', notifyRouter);
app.use('/api', messageRouter);

db.sequelize.sync()

const http = require('http').createServer(app)
const io = require('socket.io')(http)

io.on('connection', socket => {
    SocketServer(socket)
})


ExpressPeerServer(http, { path: '/' })


app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({
        status: "error",
        message: err.message,
        stack: err.stack,
        errors: err.errors,
    });
});


module.exports = app;
