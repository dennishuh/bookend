import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from "classnames";

import { registerUser } from '../../actions/authActions';

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.replace('/books');
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errors) {
      return {
        errors: nextProps.errors
      }
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        <div className="row">
          <form onSubmit={this.onSubmit}>
            <h3 className="text-center">Account Register</h3>
            <div className="row">
              <div className="input-field col s12">
                <input
                  placeholder="Name"
                  type="text"
                  name="name"
                  className={classnames('validate', {'invalid': errors.name})}
                  required
                  value={this.state.name}
                />
                {errors.name && (<span class="helper-text" data-error="wrong" data-success="right">{errors.name}</span>)}
              </div>
              <div className="input-field col s12">
                <input
                  placeholder="Email"
                  type="email"
                  name="email"
                  className={classnames('validate', {'invalid': errors.email})}
                  required
                  value={this.state.email}
                />
                {errors.email && (<span class="helper-text" data-error="wrong" data-success="right">{errors.email}</span>)}
              </div>
              <div className="input-field col s12">
                <input
                  placeholder="Password"
                  type="password"
                  className={classnames('validate', {'invalid': errors.password})}
                  required
                  name="password"
                  value={this.state.password}
                />
                {errors.password && (<span class="helper-text" data-error="wrong" data-success="right">{errors.password}</span>)}
              </div>
              <div className="input-field col s12">
                <input
                  placeholder="Confirm Password"
                  type="password"
                  className={classnames('validate', {'invalid': errors.password2})}
                  required
                  name="password2"
                  value={this.state.password2}
                />
                {errors.password2 && (<span class="helper-text" data-error="wrong" data-success="right">{errors.password2}</span>)}
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
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, {registerUser})(withRouter(Register));
