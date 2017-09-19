const {db,} = require('../pgp');
const bcrypt = require('bcrypt');
class User {
  constructor (db) {
    this.db = db;
  }
  checkUser (username) {
    return this.db.any("SELECT * FROM users WHERE username = $1", username);
  }
  insertUser (username, email, password) {
    return this.db.none("INSERT INTO users(username, email, password) VALUES($1, $2, $3)", [username, email, password]);
  }
  findById (id) {
    return this.db.any("SELECT * FROM users WHERE id = $1", id)
  }
}

module.exports = new User(db);

module.exports.hashPassword = async(password) => {
  try {
    const salt =  await bcrypt.genSalt(5);
    return await bcrypt.hash(password,salt)
  }
  catch(error) {
    throw new Error('Hashing failed',error)
  }
}

module.exports.comparePasswords = async (inputPassword, hashedPassword) => {
  try {
       return  await bcrypt.compare(inputPassword,hashedPassword);
  }
  catch(error) {
      throw new Error('Comparing failed', error)
  }
}