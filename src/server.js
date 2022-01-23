require("dotenv").config();
require('events').EventEmitter.defaultMaxListeners = 15;

const express = require("express");
const path = require("path");
const cors = require('cors');
const appRoutes = require('./routes');

const app = express();

app.use(cors({
    origin: "*",
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" );
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    "/files",
    express.static(path.resolve(__dirname, "../", "tmp", "uploads"))
);
app.use(appRoutes);

app.listen(process.env.PORT || 3333);