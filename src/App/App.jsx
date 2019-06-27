import React from "react";
import { Router, Route, Link } from "react-router-dom";

import { history, Role } from "@/_helpers";
import { authenticationService } from "@/_services";
import { PrivateRoute } from "@/_components";
import { HomePage } from "@/HomePage";
import { AdminPage } from "@/AdminPage";
import { LoginPage } from "@/LoginPage";

import "bulma/css/bulma.css";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      isAdmin: false
    };
  }

  componentDidMount() {
    authenticationService.currentUser.subscribe(user =>
      this.setState({
        currentUser: user,
        isAdmin: user && user.role === Role.Admin
      })
    );
  }

  logout() {
    authenticationService.logout();
    history.push("/login");
  }

  render() {
    const { currentUser, isAdmin } = this.state;
    return (
      <Router history={history}>
        <div>
          {currentUser && (
            <nav className="navbar">
              <Link to="/">Home</Link>
              {isAdmin && <Link to="/admin">Admin</Link>}
              <button onClick={this.logout}>Logout</button>
            </nav>
          )}
          <div>
            <PrivateRoute exact path="/" component={HomePage} />
            <PrivateRoute
              path="/admin"
              roles={Role.Admin}
              component={AdminPage}
            />
            <Route path="/login" component={LoginPage} />
          </div>
        </div>
      </Router>
    );
  }
}

export { App };
