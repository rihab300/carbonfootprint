const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const carbonFootprintController = require('../controllers/carbonFootprintController');

//carbonFootprintRoutes Endpoint

router.post('/calculateCarbonFootprint', carbonFootprintController.calculateCarbonFootprint);


module.exports = router;
