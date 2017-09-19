const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const {db,} = require('./pgp');
const session = require('express-session');

/**Configure Nunjucks template**/
nunjucks.configure('views', {
	autoescape: true,
	cache: false,
	express: app,
	watch: true
})
app.engine('html', nunjucks.render)
app.set('view engine', 'html')

/** Body Parser**/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

/** Configure Passport **/
app.use(session({secret:"mysecret"}))


app.use(passport.initialize());
app.use(passport.session());
require('./passport/passport')(passport);
require('./passport/local/local')(passport);
require('./passport/facebook/facebook')(passport);
require('./passport/google/google')(passport);

/** Configure Router**/
const index = require('./routes/index')(express);
app.use('/',index)

const port = 3000;
app.listen(port, () =>{
  console.log(`Server is running in port ${port}`)
})
