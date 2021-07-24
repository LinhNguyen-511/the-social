import React from 'react'
import './sass/App.sass'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// import pages
import Login from './pages/login'

function App() {
  return (
        <Router>
            <div>
                {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/profile">Your profile</Link>
            </li>
          </ul>
        </nav> */}

                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/profile">{/* <Users /> */}</Route>
                    <Route path="/">{/* <Home /> */}</Route>
                </Switch>
            </div>
        </Router>
  )
}

export default App
