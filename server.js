const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');

require('./db/db.js');

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
}

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(session({
  secret: 'nugget007',
  resave: false,
  saveUninitialized: false,
}))
app.use(cors(corsOptions));

// Use Routes
const authController = require('./controllers/authController');
const postController = require('./controllers/postController');
app.use('/auth', authController);
app.use('/api/v1/post', postController);



app.listen(process.env.PORT || 9000, () =>{
  console.log('listening on port 9000');
})
