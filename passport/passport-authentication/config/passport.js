const passport = require('passport');
// const {db,} = require('../pgp');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');
passport.serializeUser((user,done) => {
    done(null,user.id)
});


passport.deserializeUser(async(id, done) => {
  try{
    const  user = await User.findById(id);
    done(null, user)
  }
  catch(error) {
    done(error,null)
  }
})

passport.use('local', new LocalStrategy({
  usernameField:'email',
  passwordField:'password',
  passReqToCallback: false
}, async(email, password, done) => {
  try {
      //Check if the email is already exists
      const user = await User.checkUser(email);
      if(!user) {
          return done(null, false, {message:'Unknown User'})
      }
      //Check if the password is correct 
      const isValid = User.comparePasswords(password,user.password);
      if(isValid) {
        console.log(user);
        return done(null, users)
      } else{
        return done(null, false, {message: 'Unknown password'})
      }
  }
  catch(error) {
      return done(error, false);
  }
}))