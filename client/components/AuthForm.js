import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store/auth";
import { Form, Button } from 'react-bootstrap'

/**
 * COMPONENT
 */

const AuthForm = props => {
  const { email, displayName, handleSubmit, error, name } = props;
  return (
        <Form
          onSubmit={evt => handleSubmit(evt)}
          email={email}
          name={name}
          className="form"
        >
          <div className="u-margin-bottom-medium">
            {name !== "login" ? (
              <h2 className="heading-secondary">Sign Up To Annotate</h2>
            ) : (
              <h2 className="heading-secondary">Login To Annotate</h2>
            )}
          </div>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
            <Button type="submit" variant="primary" className="btn-primary">
              {displayName}
            </Button>{' '}
          {error && error.response && <div> {error.response.data} </div>}
    </Form>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error
  };
};

const mapSignup = state => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error
  };
};

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(authenticate(email, password, formName));
    }
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
