import React, { useState } from 'react'
import axios from 'axios'

import Nav from './components/Nav'
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

  const pathname = window.location.pathname.split('/')[1]

  return (
    <div className="App">
      <header>
        Dad Jokes
      </header>

      <Nav path={path} />

      <section>
        {(() => {
          console.log(pathname)
          switch (pathname) {
            case 'register':
              return <Login registered={false} login={register} />
            case 'login':
              return <Login registered={true} login={login} />
            case 'jokes':
              return <Jokes />
            default:
              return <Login registered={registered} login={register} />
          }
        })()}
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
          window.location.pathname = '/jokes'
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

  function path(name) {
    if (name === 'login') {
      setRegistered(true)
    }
    window.location.pathname = `/${name}`
  }
}

export default App;
