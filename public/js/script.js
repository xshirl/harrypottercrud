const studentsRouter = require('../../routes/studentsRoutes');

function deleteStudent(url) {
  return fetch(url, {
    method:'delete'
  }).then(res => {
    res.send('Deleted successfully')
  })
}
