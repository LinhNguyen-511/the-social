// this page has an animated background and a login card 
//with link to signup / recover password

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
//  import { Player, Controls } from '@lottiefiles/react-lottie-player';

class Login extends Component {
    render() {
        return (
            <div className="page-wrapper">
                <video autoPlay loop muted id="background">
                    <source src="./../media/background.mp4" type="video/mp4" />
                </video>

                <div className="login card">
                    <h1>Login</h1>

                    <form className="login form" action="" method="POST">
                        <div className="login fields col">
                            <div className="login field col">
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" id="email" />
                            </div>

                            <div className="login field col">
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                />
                            </div>

                            <div className="login field col">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                />
                            </div>
                        </div>

                        <button type="button">Login</button>
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
}

export default Login
