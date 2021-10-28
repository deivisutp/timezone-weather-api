require("dotenv").config();

const serverless = require("serverless-http");
const express = require("express");
const path = require("path");
const cors = require('cors');
const appRoutes = require('./routes');

const app = express();

app.use(cors({
    exposedHeaders: "X-Total-Count"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    "/files",
    express.static(path.resolve(__dirname, "../", "tmp", "uploads"))
);
app.use(appRoutes);

module.exports.handler = serverless(app);
//app.listen(process.env.PORT || 3333);