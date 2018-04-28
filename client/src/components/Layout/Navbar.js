import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Navbar = (props) => (
  <nav className="blue-grey darken-4">
    <div className="container">
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo left"><i className="fal fa-align-left" data-fa-transform="shrink-2 rotate-270"></i>bookend<i className="fal fa-align-right" data-fa-transform="shrink-2 rotate-90"></i></Link>
        <ul className="right">
          {props.user
            ? (
              <Fragment>
                <li><a href="/books"><i className="fal fa-book"></i> My Books</a></li>
                <li><a href="/users/logout"><i className="fal fa-sign-out"></i> Logout</a></li>
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

export default Navbar;
