import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    return (
      <nav className="blue-grey darken-4">
        <div className="container">
          <div className="nav-wrapper">
            <Link to="/" className="brand-logo left"><i className="fal fa-align-left" data-fa-transform="shrink-2 rotate-270"></i>bookend<i className="fal fa-align-right" data-fa-transform="shrink-2 rotate-90"></i></Link>
            <ul className="right">
              {isAuthenticated
                ? (
                  <Fragment>
                    <li><Link to="/books"><i className="fal fa-book"></i> My Books</Link></li>
                    <li><a href="" onClick={this.onLogoutClick}><i className="fal fa-sign-out"></i> Logout {user.name}</a></li>
                  </Fragment>
                )
                : (
                  <Fragment>
                    <li><Link to="/login"><i className="fal fa-sign-in-alt"></i> Login</Link></li>
                    <li><Link to="register"><i className="fal fa-user-plus"></i> Register</Link></li>
                  </Fragment>
                )
              }
            </ul>
          </div>
        </div>
      </nav>

    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
