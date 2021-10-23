const { Router } = require("express");
const CountriesController = require("../controllers/CountriesController");

const routes = Router();

routes.get("/:country_name", CountriesController.show);

module.exports = routes;