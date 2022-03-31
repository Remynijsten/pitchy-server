const cors          = require('cors');
const express       = require('express');
const es            = require('express-session')
const fs            = require("fs");
const jwt           = require("jsonwebtoken");
const app           = express();

const PORT          = process.env.PORT || 3000;
const HOST          = process.env.HOST || 'localhost';

// Parse env file
require('dotenv').config();

require("./helpers/mongo.js")();

app.set('trust proxy', 1)

app.use(cors({origin: ['http://localhost:8080', 'http://172.16.10.149:8080'], credentials: true, methods: ['GET', 'POST', 'PUT', 'DELETE'], allowedHeaders: ['Content-Type', 'Authorization']}))

app.get('/', (req, res) => {
    res.send('haha')
});

// Create server
const server    = app.listen(PORT)
const io        = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true
    },
    handlePreflightRequest: (req, res) => {
        const headers = {
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
            "Access-Control-Allow-Credentials": true
        };
        res.writeHead(200, headers);
        res.end();
    }
})
require('./helpers/socketServer')(io);

console.log(`Listening On http://localhost:${PORT}/api`);

module.exports.app = app;