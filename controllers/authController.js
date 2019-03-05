const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/auth');

router.post('/register', async (req, res) =>{
  try {
    console.log(req.body, '<---- this is req.body in /register')
    const password = req.body.password;
    const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const userEntry = {};
    userEntry.picture = req.body.picture;
    userEntry.about = req.body.about;
    userEntry.location = req.body.location;
    userEntry.email = req.body.email;
    userEntry.username = req.body.username;
    userEntry.password = passwordHash;

    userEntry.createdBy = req.session.username;


    console.log(userEntry, '<--- this is userEntry')

    const createUser = await User.create(userEntry);
    console.log(createUser, '<----- this is the new register user')

    req.session.cookie.username = req.body.username;
    req.session.userID = createUser._id;
    req.session.logged = true;
    req.session.save();

    res.json({
      status: 200,
      data: 'register successful'
    })

  } catch (err) {
    res.json({
      status: 400,
      data: err.message
    })
  }
})

router.post('/login', async(req, res) =>{
  try {
    console.log(req.body, '<--- this is req.body in /login');

    const findUser = await User.findOne({'username': req.body.username});
    console.log(findUser, ' this is found user')

    if(findUser){
      if(bcrypt.compareSync(req.body.password, findUser.password)){
        req.session.logged = true;
        req.session.username = req.body.username;
        req.session.userID = findUser._id;

        req.session.save();

        console.log(req.session.userID ,'login went successful')

        res.json({
          status: 200,
          data: 'login successful'
        })
      } else{
        console.log('password incorrect')
        res.json({
          status: 404,
          data: 'password wrong'
        })
      }
    }else(
      res.json({
        status: 401,
        data: 'username not found'
      })
    )
  } catch (err) {
    res.json({
      status: 400,
      data: err.message
    })
  }
})

router.get('/profile', async (req, res) =>{
  try {
    if(req.session.logged){
      console.log(req.session.username, '<-- user logged in');
      // const findUser = await User.findOne({username: req.body.username});
      const findUser = await User.findById(req.session.userID);

      // const findUser = await User.find();
      console.log(findUser, '<--- found the profile')

      console.log(findUser, ' <-- profile of: ', req.session.username)

      res.json({
        state: 200,
        data: findUser
      })
    }else {
      res.json({
        status: 400,
        data: 'login required'
      })
    }
  } catch (err) {
    res.json({
      status: 400,
      data: err.message
    })
  }
})

router.get('/logout', (req, res) =>{
  try {
    if(req.session.logged){
      req.loggout();
      res.json({
        status: 200,
        data: 'logout successful'
      })
    }else {
      res.json({
        status: 400,
        data: 'logout unsuccessful'
      })
    }
  } catch (err) {
    res.json({
      status: 400,
      data: err.message
    })
  }
})


module.exports = router;
