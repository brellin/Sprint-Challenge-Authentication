import React from 'react'
import { useForm } from 'customHooks'

const Login = props => {
    const { handleChanges, fields } = useForm()
    return (
        <div className='Login'>
            <h2>{props.registered ? 'Log In' : 'Register'}</h2>
            <form>
                <p>Username:</p>
                <input onChange={handleChanges} name='username' value={fields.username} type="text" />

                <p>Password:</p>
                <input onChange={handleChanges} name='password' value={fields.password} type="password" />

                <button onClick={(e) => {
                    e.preventDefault()
                    props.login(fields)
                }}>Submit</button>
            </form>
        </div>
    )
}

export default Login
