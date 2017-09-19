const {db, }  =require('../../pgp');
const LocalStrategy = require('passport-local').Strategy;

module.exports = (passport) => {
  passport.use(new LocalStrategy(
    (username, password, done) => {
      db.any('SELECT * FROM users WHERE username = $1', username)
        .then( data => {
          console.log(data);
        const userRecord = data.find(usr => usr.username == username);
        // console.log(userRecord)
          if(data && data[0].password == password) {
            return done(null, data)
          } else {
            return done(null, false)
          }
        })
        .catch( error => {
          return done(null, false);
        });
    }
  ))
  passport.serializeUser((user, done) => {
    done(null, user.username)
  })
}
