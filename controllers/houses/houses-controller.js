const housesDb = require('../../models/houses');

function getAll(req, res, next) {
  console.log('About to query the DB');
  housesDb.getAllHouses()
    .then(data => {
      console.log('Queried DB and got' + data.length + 'results');
      res.locals.houses = data;
      next();
    })
    .catch(err=> {
      next(err);
    })
}

function getOne(req, res, next) {
  housesDb.getOneHouse(req.params.id)
    .then(data=> {
      res.locals.house = data;
      next();
    })
    .catch(err=> {
      next(err);
    })
}

function getStudentsHouse(req, res, next) {
  housesDb.getStudentHouse(req.params.id)
    .then (data => {
      res.locals.students = data;
      next();
    })
    .catch(err=> {
      next(err);
    })
}
module.exports = {
  getAll,
  getOne,
  getStudentsHouse
}
