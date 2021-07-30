// this page has an animated background and a login card 
//with link to signup / recover password

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    // send inputs to backend 
    const handleSubmit = () => {
    
        const url = 'http://localhost:4000/api/auth/login'
        let data = {
            username: username,
            password: password
        }
        axios.post(url, data)
        .then(response => console.log('Login: ' + response))
        .catch(e => console.log(e))
    }

        return (
            <div className="page-wrapper">

                <div className="login card">
                    <h1>Login</h1>

                    <form className="login form" action="" method="POST">
                        <div className="login fields col">

                            <div className="login field col">
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    value = {username} 
                                    onChange = {e => setUsername(e.target.value)} />
                            </div>

                            <div className="login field col">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value = {password} 
                                    onChange = {e => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <button type="button" onClick = {handleSubmit}>Login</button>
                    </form>

                    <Link to="/account/recover">Forgot your password?</Link>
                    <p>
                        Haven&apos;t got an account?
                        <span>
                            <Link to="/register">Sign up</Link>
                        </span>
                    </p>
                </div>
            </div>
        )
}

export default Login