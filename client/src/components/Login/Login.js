import React from 'react'
import { useForm } from 'customHooks'

const Login = props => {
    const { handleChanges, fields } = useForm()
    return (
        <div className='Login'>
            <form>
                <input onChange={handleChanges} name='username' value={fields.username} type="text" />
                <input onChange={handleChanges} name='password' value={fields.password} type="password" />
                <button onClick={(e) => {
                    e.preventDefault()
                    props.login(fields)
                }}>Log In</button>
            </form>
        </div>
    )
}

export default Login
