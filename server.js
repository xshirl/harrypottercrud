const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const methodOverride = require('method-override');
const app = express();
const PORT = process.env.PORT || 3000;

const housesRouter = require('./routes/housesRoutes');
const studentsRouter = require('./routes/studentsRoutes');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

app.get('/', (req,res) => {
  res.render('home/index');
})


app.use('/houses', housesRouter);
app.use('/students', studentsRouter);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
})
