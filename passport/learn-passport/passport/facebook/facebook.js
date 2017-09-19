const {db, } = require('../../pgp');
const FacebookStrategy = require('passport-facebook').Strategy;

module.exports = (passport) => {
    passport.use('facebook', new FacebookStrategy({
         clientID: '155329201712724',
         clientSecret:'81379ae371ad4b52efa14e82a20bd07f',
         callbackURL: "http://localhost:3000/auth/facebook/callback",
         profileFields: ['id', 'emails', 'displayName'] // Dữ liệu trả về. Mặc định ko trả về email nên ta thêm emails vào.
    },
    (accessToken,refreshToken, profile, done) => {
      let user = profile._json;
      console.log(profile)
      db.oneOrNone('SELECT * FROM users WHERE username = $1', user.email)
        .then( data => {
          if(data) {
            return done(null, data.username);
          }
          db.one('INSERT INTO users(username) VALUES ($1) RETURNING username',username.email)
            .then(data => {
              return done(null, data.username);
            })
            .catch( err => {
              return done(null, false)
            })
        })
        .catch( error => {
          return done(null, false)
        })
    }
  ))
}
