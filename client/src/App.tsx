import React from 'react';
import './App.sass';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// import pages
import Login from './pages/login'
import Register from './pages/register'

function App() {
  return (
    <div className="App">
      <Router>
            <div>
                <Switch>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route path="/profile">{/* <Users /> */}</Route>
                    <Route path="/">{
                        <h1>hey</h1>
                    }</Route>
                </Switch>
            </div>
        </Router>
    </div>
  );
}

export default App;
