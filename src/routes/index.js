const { Router } = require('express');

const appRoutes = Router();

const countriesRoutes = require("./countriesRoutes");

appRoutes.use("/countries", countriesRoutes);

module.exports = appRoutes;