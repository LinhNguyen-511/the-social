// this page has an animated background and a login card 
//with link to signup / recover password

import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';

// TODO: add form validation
function Register() {
    
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // send inputs to backend 
    const handleSubmit = () => {
        const url = 'http://localhost:4000/api/auth/register'
        let data = {
            username: username,
            email: email,
            password: password
        }
        axios.post(url, data)
        .then(response => console.log('Register: ' + response))
        .catch(e => console.log(e))
    }

        return (
            <div className="page-wrapper">

                <div className="register card">
                    <h1>Sign Up</h1>

                    <form className="register form" action="" method="POST">
                        <div className="register fields col">
                            <div className="register field col">
                                <label htmlFor="email">Email</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    id="email" 
                                    value = {email} 
                                    onChange = {e => setEmail(e.target.value)} />
                            </div>

                            <div className="register field col">
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    value = {username} 
                                    onChange = {e => setUsername(e.target.value)} />
                            </div>

                            <div className="register field col">
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

                        <button type="button" onClick = {handleSubmit}>Sign Up</button>
                    </form>

                </div>
            </div>
        )
}

export default Register 