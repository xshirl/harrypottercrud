const housesRouter = require('express').Router();
const housesController = require('../controllers/houses/houses-controller');
const housesViewController = require('../controllers/houses/housesViewController');

const housesDb = require('../models/houses')

function sendError(err, req, res, next) {
  console.log('I send errors');
  res.status(500).json({
    status: 'error',
    message: err.message
  })
}

housesRouter.route('/')
  .get(housesController.getAll, housesViewController.sendHouses, sendError)


housesRouter.route('/:id')
  .get(housesController.getOne, housesController.getStudentsHouse, housesViewController.sendStudentHouse)


module.exports = housesRouter;
