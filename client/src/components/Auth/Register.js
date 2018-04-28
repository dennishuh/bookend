import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { registerUser } from "../../actions/authActions";

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password2: ''
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <form className="col s12" action="/users/register" method="post">
            <h3 className="text-center">Account Register</h3>
            <div className="row">
              <div className="input-field col s12">
                <input
                  placeholder="Name"
                  type="text"
                  name="name"
                  className="validate"
                  required
                  value={this.state.name}
                />
              </div>
              <div className="input-field col s12">
                <input
                  placeholder="Email"
                  type="email"
                  name="email"
                  className="validate"
                  required
                  value={this.state.email}
                />
              </div>
              <div className="input-field col s12">
                <input
                  placeholder="Password"
                  type="password"
                  className="validate"
                  required
                  name="password"
                  value={this.state.password}
                />
              </div>
              <div className="input-field col s12">
                <input
                  placeholder="Confirm Password"
                  type="password"
                  className="validate"
                  required
                  name="password2"
                  value={this.state.password2}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-dark">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
};

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

export default connect(null, { registerUser })(Register);
