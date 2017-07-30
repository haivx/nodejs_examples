const express = require('express');
const app = express();
const gm = require('gm');
const expressValidator = require('express-validator');
const bodyParser = require("body-parser")
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true  //value of parameter can be any type https://expressjs.com/en/resources/middleware/body-parser.html
}))

app.use(bodyParser.json())

app.get('/', (req, res) => {
  //res.render('index',{content:content});
  res.json({
    tasks: [
      { desc: "Glenna Reichert" },
      { desc: "Clementina DuBuque" },
      { desc: "Nicholas Runolfsdottir" }
    ]
  })
})

app.get('/upload', (req, res) => {
  res.render('upload')
})

//Form submit page
app.get('/form', (req, res) => {
  res.render('form')
})

app.post('/form', (req, res) => {

    let users = {
      name: req.body.name,
      Email: req.body.email,
      Password: req.body.password,
      telephone: req.body.telephone
    }
    res.render('form',{users:users,errors:errors})
});

//Set static path
app.use('/public', express.static('public'))
//---------View Template Engine -------------
const nunjucks = require('nunjucks')
nunjucks.configure('views', {
  autoescape: true,
  cache: false,
  express: app,
  watch: true
})
app.engine('html', nunjucks.render)
app.set('view engine', 'html')

//--------Body Parser ----------------------

// parse application/x-www-form-urlencoded
// for easier testing with Postman or plain HTML forms

//-----------------UPLOAD AND CHANGE PICTURE --------------------
const multer = require('multer')
//app.upload = multer({ dest: 'uploads/' })
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    // console.log(file);
    cb(null, file.originalname)
  }
})

function fileFilter(req, file, cb) {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true)
  } else {
    cb(new Error(file.mimetype + ' is not accepted'))
  }
}

app.upload = multer({ storage: storage, fileFilter: fileFilter })

app.post('/upload', app.upload.single('photo'), function (req, res, next) {
  // console.log(req.file);
  // console.log(req.body);
  console.log(req.file.path);
  gm(req.file.path)
    .resize(175, 175 + '^')
    .gravity('center').write(req.file.path, function (err) {
      if (err) return next(err)
      res.render('upload', { url: req.file.path })
    });
})


const port = 4000;
app.listen(port, () => {
  console.log('Running on port: ' + port);
})