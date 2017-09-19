const passport = require('passport');
module.exports = (express) => {
  router = express.Router();

  router.get('/',(req,res) =>{
    res.render('index')
  })
  router.get('/login',(req,res) =>{
    res.render('login')
  })
  router.post('/login',passport.authenticate('local',{failureRedirect: '/login',successRedirect:'/loginOk'}));
  router.get('/loginOk',(req,res) => {
    res.send('Login Ok')
  })
  router.get('/private', (req,res) => {
    if(req.isAuthenticated()){
      res.send('Welcome to private page');
    } else {
      res.send("You're not login")
    }
  })
//Facebook Login
  router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect:'/',
      failureRedirect:'/login'
    }))
  router.get('/login/facebook/',
    passport.authenticate('facebook',{scope:['email']}));
//Google Login
  router.get('/login/google',
    passport.authenticate('google',{scope:['https://www.googleapis.com/auth/userinfo.email']})
)
  router.get('/auth/google/callback',
  passport.authenticate('google',{failureRedirect:'/login1'}),
  (req,res) => {
    res.redirect('/private');
  }
)

  return router;
}
