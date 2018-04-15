const studentsRouter = require('express').Router();
const studentsController = require('../controllers/students/students-controller');
const studentsViewController = require('../controllers/students/studentsViewController');

const studentsDb = require('../models/students');

function sendError(err, req, res, next) {
  console.log('I send errors');
  res.status(500).json({
    status: 'error',
    message: err.message
  })
}

studentsRouter.route('/')
  .get(studentsController.getAll, studentsViewController.sendStudents, sendError)
  .post(studentsController.create, studentsViewController.sendCreateStudent)

studentsRouter.route('/new')
  .get(studentsController.getHouses, studentsViewController.sendHouses)

studentsRouter.route('/:id')
  .get(studentsController.getOne, studentsViewController.sendOneStudent)
  .put(studentsController.update)
  .delete(studentsController.destroy, studentsViewController.deleteStudent)

studentsRouter.route('/:id/edit')
.get(studentsController.getOne, studentsController.getHouses, studentsViewController.editStudent)


module.exports = studentsRouter;
