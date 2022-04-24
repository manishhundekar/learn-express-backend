//Imports
var express = require('express');
var router = express.Router();
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

var app = express();

var doctorsRouter = require('./Controller/Doctors');
var hospitalsRouter = require('./Controller/Hospitals');
var profileRouter = require('./Controller/Profile');
var reportsRouter = require('./Controller/Reports');
var specimensRouter = require('./Controller/Specimens');
var invoicesRouter = require('./Controller/Invoices');

//Homepage
router.get('/', function(req, res){
   res.send("Admin Homepage!");
});

//Doctors
router.use('/doctors', doctorsRouter);

//Doctors
router.use('/hospitals', hospitalsRouter);

//Profile
router.use('/profile', profileRouter);

//Reports
router.use('/reports', reportsRouter);

//Specimens
router.use('/specimens', specimensRouter);

//Invoices
router.use('/invoices', invoicesRouter);

//Final
router.get('*', function(req, res){
   res.status(400).json({
      message : "Admin: Invalid Request"
    })
    res.end()
});

module.exports = router;