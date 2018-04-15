function sendStudents(req, res) {
  console.log('I send successful responses');
  res.render('students/index', {
    students: res.locals.students
  })
}


function sendOneStudent(req, res) {
  res.render('students/show', {
    student: res.locals.student
  })
}

function sendCreateStudent(req, res) {
  student = res.locals.newStudent
  res.redirect(`students/${student.id}`);
}

function sendHouses(req, res) {
  res.render('students/new', {
    student: res.locals.newStudent,
  })
}


function editStudent(req, res) {
  student = res.locals.student;
  res.render(`students/edit`, {
    student: res.locals.student
  })
}


function deleteStudent(req, res) {
  res.redirect(`students/index`);
}

module.exports = {
  sendStudents,
  sendOneStudent,
  sendCreateStudent,
  editStudent,
  sendHouses,
  deleteStudent
}
