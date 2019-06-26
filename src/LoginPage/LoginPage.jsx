import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";

import * as Yup from "yup";

import { authenticationService } from "../_services";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    if (authenticationService.currentUserValue) {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <div>
        <div>
          <strong>Normal User</strong> - U: user P: user
          <br />
          <strong>Administrator</strong> - U: admin P:admin
        </div>
        <h2>Login</h2>
        <Formik
          initialValues={{
            username: "",
            password: ""
          }}
          validationSchema={Yup.object().shape({
            username: Yup.string().required("username is required"),
            password: Yup.string().required("password is required")
          })}
          onSubmit={({ username, password }, { setStatus, setSubmitting }) => {
            setStatus();
            authenticationService.login(username, password).then(user => {
              const { from } = this.props.location.state || {
                from: { pathname: "/" }
              };

              this.props.history.push(from);
            });
          }}
          render={() => (
            <Form>
              <div className="row">
                <div className="input-field col s12">
                  <Field className="validate" name="username" type="text" />
                  <ErrorMessage name="username" component="div" />
                </div>
              </div>
              <Field name="password" type="text" />
              <ErrorMessage name="password" component="div" />
            </Form>
          )}
        />
      </div>
    );
  }
}

export { LoginPage };
