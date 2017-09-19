const { db, } = require('../../pgp');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = (passport) => {
  passport.use(new GoogleStrategy({
    clientID: '567657512309-u0h23ci76hhfjqdk07l8dd2lchlc5v9f.apps.googleusercontent.com',
    clientSecret: '4H5bygOxgdtPm39MXGxFum1b',
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
    (accessToken, refreshToken, profile, done) => {
      // console.log(profile);
      let user = profile._json;
      let email = profile.emails[0].value;
      let _id = user.id;
      let name = user.displayName
      // console.log(email)
      // db.any('SELECT * FROM google_oauth')
      //   .then(data => {
      //     console.log(data);
      //   })  
      db.oneOrNone('SELECT * FROM google_oauth WHERE email = $1 AND username = $2', [email,name])
        .then(data => {
            if(data) {
              return done(null, data.username)
            }
            db.one('INSERT INTO google_oauth(id, email, username) VALUES($1, $2, $3) RETURNING email',[_id,email,name ])
              .then( data => {
                // console.log(data)
                console.log(data.email);
                return done(null, data.email)
              })
              .catch( err => {
                  return done(null, false)
              })
        })
        .catch(error => {
          return done(null, false)
        })
    }
  ))
}