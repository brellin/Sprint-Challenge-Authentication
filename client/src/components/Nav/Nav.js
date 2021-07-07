import React from 'react'

const Nav = props => {
    return (
        <nav>
            <span onClick={() => props.path('register')}>Register</span>
            <span onClick={() => props.path('login')}>Log In</span>
            <span onClick={() => props.path('jokes')}>Jokes</span>
            <span onClick={() => logout()}>Log Out</span>
        </nav>
    )

    function logout() {
        localStorage.removeItem('token')
        window.location.pathname = '/login'
    }
}

export default Nav
