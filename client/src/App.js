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
            <Login login={login} />
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
}

export default App;
