const express = require("express");
const carController = require("./../controllers/carController.js");
const authController = require("./../controllers/authController");
const carRouter = express.Router();

//routes
carRouter
    .all('/', authController.protect)
    .get('/', carController.getAllCar)
    .post('/product', authController.protect, carController.addProductToCar)
    .post('/pay', authController.protect, carController.payCar)
    .delete('/product/:id', authController.protect, carController.deleteCar);

module.exports = carRouter;