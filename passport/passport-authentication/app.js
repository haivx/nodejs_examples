const {db,} = require('./pgp');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const session = require('express-session');
const nunjucks = require('nunjucks');
const path = require('path');
const passport = require('passport');
const app = express();
require('./config/passport');
app.use(morgan('dev'));
//Middleware
app.use(session({
  cookie: { maxAge: 60000 },
  secret: 'codeworkrsecret',
  saveUninitialized: false,
  resave: false
}));

app.use(passport.initialize());
app.use(passport.session());

nunjucks.configure(path.join(__dirname, 'views'), {
    autoescape: true,
    express: app,
    cache: false,
    watch: true
});
app.engine('html', nunjucks.render);
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use((req,res,next) => {
  res.locals.success_messages = req.flash('success');
  res.locals.error_messages = req.flash('error');
  res.locals.isAuthenticated = req.user ? true : false;
  next();
})
//Routes
app.use('/', require('./routes/index'));
app.use('/users',require('./routes/users'));
//Start server
const port = process.env.PORT || 3000;

app.listen(port);

console.log(`Server is running in port ${port}`);
