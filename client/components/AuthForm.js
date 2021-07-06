import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store/auth";

/**
 * COMPONENT
 */

const AuthForm = props => {
  const { email, displayName, handleSubmit, error, name } = props;
  return (
    <section className="section-book">
      <div className="row">
        <div className="book">
          <div className="book__form">
            <form
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
              <div className="form__group">
                <input
                  name="email"
                  type="email"
                  className="form__input"
                  placeholder="Email"
                  id="email"
                />
                <label htmlFor="email" className="form__label">
                  Email address
                </label>
              </div>
              <div className="form__group">
                <input
                  name="password"
                  type="password"
                  className="form__input"
                  placeholder="Password"
                  id="password"
                />
                <label htmlFor="password" className="form__label">
                  Password
                </label>
              </div>
              <div className="form__group">
                <button type="submit" className="btn btn--green">
                  {displayName}
                </button>
              </div>
              {error && error.response && <div> {error.response.data} </div>}
            </form>
          </div>
        </div>
      </div>
    </section>
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
