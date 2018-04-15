const db = require('../config/connection');

function getAllHouses() {
  const queryPromise = db.manyOrNone(`
    SELECT * FROM houses`);
  return queryPromise;
}

function getOneHouse(id) {
  const queryPromise = db.one(`
    SELECT * FROM houses
    WHERE id = $1`, id);
  return queryPromise;
}

function getStudentHouse(id) {
  const query = db.any(`
    SELECT * FROM students
    JOIN houses ON houses.id = students.house_id
    WHERE students.house_id = $1`, id);
  return query
}
module.exports = {
  getAllHouses,
  getOneHouse,
  getStudentHouse
}
