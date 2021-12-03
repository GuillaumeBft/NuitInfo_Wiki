const express = require('express');
//Usefull middlewares
const morgan = require('morgan'); // Middleware for logging request to server
const helmet = require('helmet'); //For security check https://helmetjs.github.io/ for more details
const cors = require('cors');

//Routes
const user_routes = require("../routes/UserRoutes");
<<<<<<< HEAD
const boat_routes = require("../routes/BoatRoutes");
=======
const rescue_routes = require("../routes/RescueRoutes");
>>>>>>> homeSearch

//Default responses
const { pageNotFoundResponse } = require("./Response");

const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));

// parse application/json
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.send('Root');
});

app.use('/user_api', user_routes);
<<<<<<< HEAD
app.use('/boat_api', boat_routes);
=======
app.use('/rescue_api', rescue_routes);
>>>>>>> homeSearch

app.use(function (req, res, next) {
    res.status(404).json(pageNotFoundResponse());
});

module.exports = app;