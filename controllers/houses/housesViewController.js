function sendHouses(req, res) {
  console.log('I send successful responses');
  res.render('houses/index', {
    houses: res.locals.houses
  })
}

function sendStudentHouse(req, res) {
  res.render('houses/show', {
    house: res.locals.house,
    students: res.locals.students
  })
}


// function sendOneHouse(req, res) {
//   res.render('houses/show', {
//     house: res.locals.house
//   })
// }



module.exports = {
  sendHouses,
  // sendOneHouse,
  sendStudentHouse
}
