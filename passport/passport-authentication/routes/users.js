const express = require('express');
const joi = require('joi');
const {db,} = require('../pgp');
const User = require('../models/users');
const router = express.Router();
const passport = require('passport');

//Validation Schema
const userSchema = joi.object().keys({
  username: joi.string().alphanum().min(3).max(30).required(),
  email: joi.string().email().required(),
  password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
  confirmationPassword: joi.any().valid(joi.ref('password')).required()
})

router.route('/register')
.get((req,res) => {
  res.render('register');
})
.post(async(req,res,next) => {
  try {
  const result = joi.validate(req.body,userSchema)
  // console.log('result',result);
  if(result.error) {
    req.flash('error','Data is not valid. Please try again');
    res.redirect('/users/register');
    return;
  }
  //Checking if email is already taken
  const user = await User.checkUser(result.value.username)
  // console.log('user',user);
  if(user.length > 0) {
    req.flash('error','Username is already in use');
    res.redirect('/users/register');
    return ;
  }
  //Hash the password
  const hash = await User.hashPassword(result.value.password);
    console.log('hash',hash)

    delete result.value.confirmationPassword;
    result.value.password = hash;
    // console.log('new values', result.value);
    await  User.insertUser(result.value.username,result.value.email,result.value.password);

    req.flash('success','You may login now :D ')
    res.redirect('/users/login');
  } catch(error){
    next(error);
  }
})

router.route('/login')
.get((req,res) => {
  res.render('login');
})
.post(passport.authenticate('local',{
  successRedirect:'/users/dashboard',
  failureRedirect: '/users/login',
  failureFlash: true
}))

router.route('/dashboard')
.get((req,res) => {
  console.log('req.user',req.user);
  res.render('dashboard')
})

module.exports = router;
