const express = require('express');
const router = express.Router();
const User = require('../models/auth');
const Post = require('../models/post');
const Wanted = require('../models/wanted');
const Jobs = require('../models/job');


router.post('/create', async(req, res) =>{
  try {
    if(req.session.logged){
      console.log(req.session, '<--- this is req.session')
      const userEntry = {};
      userEntry.createdBy = req.session.username;
      userEntry.title = req.body.title;
      userEntry.picture = req.body.picture;
      userEntry.description = req.body.description;
      userEntry.price = req.body.price;
      userEntry.location = req.body.location;
      userEntry.createdAt = req.body.createdAt;
      userEntry.category = req.body.category;

      console.log('the data is save in ', userEntry.category)
      console.log(userEntry, '<--- this is userEntry');

      const createPost = await Post.create(userEntry);

      console.log(createPost, ' is created by:', req.session.username);

      res.json({
        status: 200,
        data: createPost,
        created: 'post created successful'
      })
    }
    else {
      res.json({
        status: 200,
        data: 'login required'
      })
    }
  } catch (err) {
    res.json({
      status: 400,
      data: err
    })
  }
})

router.get('/userPost', async(req, res) =>{
  try {
    if(req.session.logged){
      console.log('user ', req.session.username, 'is logged in')
      const findPost = await Post.find({createdBy: req.session.username});

      console.log(findPost, ' these are the user: ', req.session.username, ' posts.')

      res.json({
        status: 200,
        data: findPost
      })
    }else{
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

router.get('/allPost', async(req, res) =>{
  try {
    const findPosts = await Post.find();
    console.log(findPosts, ' these are all the posts');

    res.json({
      status: 200,
      data: findPosts
    })
  } catch (err) {
    res.json({
      status: 400,
      data: err.message
    })
  }
})

router.get('/:id', async(req, res) =>{
  try {
    const deletePost = await Post.findByIdAndRemove(req.params.id);
    console.log(deletePost, 'this is the delete post');

    res.json({
      status: 200,
      data: deletePost
    })

  } catch (err) {
    res.json({
      status: 400,
      data: err.message
    })
  }
})


module.exports = router;
