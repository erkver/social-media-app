require('dotenv').config();
const express = require('express');
const session = require('express-session');
const app = express();
const port = 3001;
const massive = require('massive');
const { json } = require('body-parser');
const {
  register,
  login,
  getUser,
  logout
} = require('./controllers/auth_controller');
const { updateUser } = require('./controllers/user_controller');
const {
  getPosts,
  getPost,
  addPost,
  editPost,
  deletePost
} = require('./controllers/post_controller');
const {
  getComments,
  getComment,
  addComment,
  editComment,
  deleteComment
} = require('./controllers/comment_controller');

app.use(json());

massive(process.env.CONNECTION_STRING)
  .then(db => app.set('db', db))
  .catch(err => console.log(err));

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000000000
    }
  })
);

//auth endpoints
app.post('/auth/register', register);
app.post('/auth/login', login);
app.get('/auth/me', getUser);
app.get('/auth/logout', logout);

//user profile endpoint
app.put('/api/user/:id', updateUser);

//post endpoints
app.get('/api/posts', getPosts);
app.get('/api/post/:id', getPost);
app.post('/api/post', addPost);
app.put('/api/post/:id', editPost);
app.delete('/api/post/:id', deletePost);

app.get('/api/comments/:id', getComments);
app.get('/api/comment/:id', getComment);
app.post('/api/comment', addComment);
app.put('/api/comment/:id', editComment);
app.delete('/api/comment/:id', deleteComment);

app.listen(port, () => console.log(`Listening on port ${port}`));
