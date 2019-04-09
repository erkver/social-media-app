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

//user endpoint
app.post('/api/user/:id', updateUser);

app.listen(port, () => console.log(`Listening on port ${port}`));
