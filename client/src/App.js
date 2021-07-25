"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./sass/App.sass");
var react_router_dom_1 = require("react-router-dom");
// import pages
var login_1 = __importDefault(require("./pages/login"));
function App() {
    return (<react_router_dom_1.BrowserRouter>
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
                <react_router_dom_1.Switch>
                    <react_router_dom_1.Route path="/login">
                        <login_1.default />
                    </react_router_dom_1.Route>
                    <react_router_dom_1.Route path="/profile">{/* <Users /> */}</react_router_dom_1.Route>
                    <react_router_dom_1.Route path="/">{/* <Home /> */}</react_router_dom_1.Route>
                </react_router_dom_1.Switch>
            </div>
        </react_router_dom_1.BrowserRouter>);
}
exports.default = App;
