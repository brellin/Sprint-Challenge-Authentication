import React, { useState } from 'react'
import axios from 'axios'

import Login from './components/Login'
import Jokes from './components/Jokes'
import './App.scss';

axios.defaults.baseURL = 'http://localhost:3300/api'

axios.interceptors.request.use(
  function (requestConfig) {
    requestConfig.headers.authorization = localStorage.getItem('jwt')

    return requestConfig
  },
  function (err) {
    return Promise.reject(err)
  }
)

function App() {
  const [registered, setRegistered] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : false)
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <div className="App">
      <header>
        Dad Jokes
      </header>

      <section>
        {
          loggedIn ?
            <Jokes />
            :
            <Login registered={registered} login={registered ? login : register} />
        }
      </section>
    </div>
  )

  function login(user) {
    axios
      .post('/login', user)
      .then(res => {
        if (res.status === 200) {
          localStorage.setItem('token', res.data.token)
          setLoggedIn(true)
          alert(res.data.message)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  function register(user) {
    axios
      .post('/register', user)
      .then(res => {
        if (res.status === 200) {
          localStorage.setItem('user', true)
          setRegistered(true)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export default App;
