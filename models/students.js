const db = require('../config/connection');

function getAllStudents() {
  const queryPromise = db.manyOrNone(`
    SELECT * FROM students`);
  return queryPromise;
}

function getOneStudent(id) {
  const queryPromise = db.one(`
    SELECT * FROM students
    WHERE id = $1`, id);
  return queryPromise;
}

function createStudent(student) {
  const query = db.one(`
    INSERT INTO students
    (fname, lname, image, house_id)
    VALUES ($/fname/, $/lname/, $/image/, $/house_id/)
    RETURNING *`,
    student);
  return query;
}


function updateStudent(student) {
  const query = db.one(`
    UPDATE students
    SET fname = $/fname/, lname = $/lname/, image = $/image/,
    house_id = $/house_id/
    WHERE id = $/id/
    RETURNING *`,
    student );
  return query;
}

function deleteStudent(id) {
  const query = db.none(`
    DELETE FROM students
    WHERE id = $1`, id);
  return query;
}

module.exports = {
  getAllStudents,
  getOneStudent,
  createStudent,
  updateStudent,
  deleteStudent
}
