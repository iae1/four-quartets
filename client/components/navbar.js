import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div className="navigation">
    <div className="navigation__background">&nbsp;</div>
    <nav className="navigation__nav">
      {isLoggedIn ? (
        <>
          <Link to="/" className="navigation__link">
            Home
          </Link>
          <Link to="/poems" className="navigation__link">
            The Quartets
          </Link>
          <Link to="#" onClick={handleClick} className="navigation__link">
            Logout
          </Link>
        </>
      ) : (
        <>
          <Link to="/" className="navigation__link">
            Home
          </Link>
          <Link to="/poems" className="navigation__link">
            The Quartets
          </Link>
          <Link to="/login" className="navigation__link">
            Login
          </Link>
          <Link to="/signup" className="navigation__link">
            Sign Up
          </Link>
          <div className="navbar-user">
            {/* {email} */}
          </div>
        </>
      )}
    </nav>
  </div>
);

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    }
  };
};

export default connect(mapState, mapDispatch)(Navbar);
