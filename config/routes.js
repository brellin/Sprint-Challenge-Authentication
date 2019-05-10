const axios = require('axios');
const bcrypt = require('bcryptjs');
const db = require('../database/dbConfig')
const jwt = require('jsonwebtoken')

const { authenticate } = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  const { body } = req
  if (body.username && body.password) {
    body.password = bcrypt.hashSync(body.password, 10)
    db('users').insert(body)
      .then(id => {
        res.status(200).json({
          id: id[0],
          username: body.username,
          password: body.password,
        })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          error: 'Internal Server Error',
          err
        })
      })
  } else {
    res.status(400).json({
      error: 'You must include a username and a password'
    })
  }
}

async function login(req, res) {
  const { username, password } = req.body
  if (username && password) {
    await db('users').where({ username }).first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = buildToken(user)
          res.status(200).json({
            message: `Welcome, ${user.username}!`,
            token
          })
        } else {
          res.status(401).json({
            error: 'Invalid Credentials'
          })
        }
      })
  } else {
    res.status(400).json({
      error: 'You must include a username and a password'
    })
  }
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}

function buildToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  }

  const options = {
    expiresIn: '1h'
  }

  return jwt.sign(payload, process.env.JWT_SECRET, options)
}
