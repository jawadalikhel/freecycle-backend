const express = require('express');
const router = express.Router();
const Profile = require('../models/auth');

router.get('/test', (req, res) =>{
  res.json({
    msg: 'testing zilch'
  })
})

router.get('/userProfile', async (req, res) =>{
  try {
    if(req.session.logged){
      const userProfile = await Profile.find();
      console.log(userProfile, ' this is user profile')

      res.json({
        status: 200,
        data: userProfile
      })
    }else {
      const userProfile = await Profile.find();

      res.json({
        status: 200,
        data: 'login required'
      })
    }
  } catch (err) {
    res.json({
      status: 200,
      data: err.message
    })
  }
})

router.post('/create', async(req, res) =>{
  try {
    if(req.session.logged){
      const userEntry = {};
      userEntry.picture = req.body.picture;
      userEntry.firstname = req.body.firstname;
      userEntry.lastname = req.body.lastname;
      userEntry.about = req.body.about;
      userEntry.location = req.body.location;
      userEntry.createdBy = req.session.username;

      const createProfile = await Profile.create(userEntry);
      console.log(createProfile, ' is created by user ', req.session.username);

      res.json({
        status: 200,
        data: createProfile
      })

    }else{
      res.json({
        status: 200,
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


module.exports = router;
