const studentsDb = require('../../models/students');
const housesDb = require('../../models/houses');

function getAll(req, res, next) {
  console.log('About to query the DB');
  studentsDb.getAllStudents()
    .then(data => {
      console.log('Queried DB and got' + data.length + 'results');
      res.locals.students = data;
      next();
    })
    .catch(err=> {
      next(err);
    })
}

function getOne(req, res, next) {
  studentsDb.getOneStudent(req.params.id)
    .then(data=> {
      res.locals.student = data;
      next();
    })
    .catch(err=> {
      next(err);
    })
}

function getHouses(req, res, next) {
  housesDb.getAllHouses()
    .then(data => {
      res.locals.houses = data;
      next();
    })
    .catch(err=> {
      next(err);
    })
}
function create(req, res, next) {
  studentsDb.createStudent(req.body)
    .then(data => {
      res.locals.newStudent = data;
      next();
    })
    .catch(err=> {
      next(err);
    })
}

function edit(req, res) {
  studentsDb.getOneStudent(req.params.id)
    .then(data=> {
      res.locals.student = data;
      next();
    })
    .catch(err=> {
      err:err.message
    })
}

function update(req, res, next) {
  req.body.id = req.params.id;
  studentsDb.updateStudent(req.body)
    .then(data => {
      res.send('Edited successfuly')
    })
    .catch(err=> {
      err:err
    })
}

function destroy(req, res) {
  studentsDb.deleteStudent(req.params.id)
    .then(() => {
      res.send(`Deleted successfully`);
      // res.json({
      //   message: `Successfully deleted quote with id ${req.params.id}`
      // })
    })
    .catch(err => {
      res.status(500).json({
        message:err.message
      })
    })
}

module.exports = {
  getAll,
  getOne,
  create,
  edit,
  update,
  destroy,
  getHouses
}
