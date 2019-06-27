import React from "react";
import { Router, Route, Link } from "react-router-dom";

import { history, Role } from "@/_helpers";
import { authenticationService } from "@/_services";
import { ProtectedRoute } from "@/_components";
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
        <div className="hero-head">
          {currentUser && (
            <nav
              className="navbar is-primary"
              role="navigation"
              aria-label="main navigation"
            >
              <div className="container">
                <a
                  role="button"
                  className="navbar-burger burger"
                  aria-label="menu"
                  aria-expanded="false"
                  data-target="navMenu"
                  onClick={() => {
                    document
                      .querySelector(".navbar-burger")
                      .classList.toggle("is-active");
                    document
                      .querySelector(".navbar-menu")
                      .classList.toggle("is-active");
                  }}
                >
                  <span aria-hidden="true" />
                  <span aria-hidden="true" />
                  <span aria-hidden="true" />
                </a>

                <div id="navMenu" className="navbar-menu is-active">
                  <div className="navbar-start">
                    <Link className="navbar-item" to="/">
                      Home
                    </Link>
                    {isAdmin && (
                      <Link className="navbar-item" to="/admin">
                        Admin
                      </Link>
                    )}
                  </div>
                  <div className="navbar-end">
                    <div className="navbar-item">
                      <button
                        className="button is-primary is-inverted"
                        onClick={this.logout}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          )}
        </div>

        <div className="hero-body">
          <ProtectedRoute exact path="/" component={HomePage} />
          <ProtectedRoute
            path="/admin"
            roles={Role.Admin}
            component={AdminPage}
          />
          <Route path="/login" component={LoginPage} />
        </div>
      </Router>
    );
  }
}

export { App };
