import React from "react";
import { Formik, Field as Input, Form, ErrorMessage } from "formik";
import { handleLogin } from "@/_helpers";

import { authenticationService } from "../_services";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props);
    if (authenticationService.currentUserValue) {
      this.props.history.push("/");
    }
  }

  render() {
    // console.log(this.props);
    return (
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-5-tablet is-4-desktop is-3-widescreen">
              <h1 className="title">Welcome Back!</h1>
              <Formik
                props={this.props}
                initialValues={handleLogin.initialValues}
                validationSchema={handleLogin.validationSchema}
                onSubmit={(
                  { username, password },
                  { setStatus, setSubmitting }
                ) => {
                  setStatus();
                  authenticationService.login(username, password).then(
                    user => {
                      // const { from } = this.props.location.state || {
                      //   from: {
                      //     pathname: "/"
                      //   }
                      // };

                      // this.props.history.push(from);
                      console.log(user);
                    },
                    error => {
                      setStatus(error);
                      setSubmitting(false);
                    }
                  );
                }}
                render={({ values, errors, status, touched, isSubmitting }) => (
                  <Form className="box">
                    <div className="field">
                      <label className="label" htmlFor="username">
                        Username
                      </label>

                      <Input
                        className={handleLogin.getInputClassName(
                          "input",
                          values.username,
                          errors.username,
                          touched
                        )}
                        placeholder="username"
                        name="username"
                        type="text"
                      />
                      <ErrorMessage
                        className={handleLogin.getInputClassName(
                          "help",
                          values.username,
                          errors.username,
                          touched
                        )}
                        name="username"
                        component="div"
                      />
                    </div>
                    <div className="field">
                      <label className="label" htmlFor="password">
                        Password
                      </label>
                      <Input
                        className={handleLogin.getInputClassName(
                          "input",
                          values.password,
                          errors.password,
                          touched
                        )}
                        name="password"
                        type="password"
                        placeholder="password"
                      />
                      <ErrorMessage
                        className={handleLogin.getInputClassName(
                          "help",
                          values.password,
                          errors.password,
                          touched
                        )}
                        name="password"
                        component="div"
                      />
                    </div>
                    <div className="field">
                      <button
                        className="button is-success"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Login
                      </button>
                    </div>
                    {status && <div className={"help is-danger"}>{status}</div>}
                  </Form>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export { LoginPage };
