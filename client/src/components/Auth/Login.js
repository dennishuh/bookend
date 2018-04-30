import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from "classnames";
import { connect } from 'react-redux';

import { loginUser } from '../../actions/authActions';

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.replace('/books');
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.auth.isAuthenticated) {
      nextProps.history.push('/books');
    }

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

    const user = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(user);
  };

  render() {
    const { errors } = this.state;

    return this.state.user ? (
        <button onClick={this.logout.bind(this)}>Logout</button>
      ) : (
        <div className="container">
        <form className="col s12" onSubmit={this.onSubmit}>
          <h3 className="text-center">Account Login</h3>
          <div className="row">
            <div className="input-field col s12">
              <input placeholder="Email" type="email" name="email" className="validate" onChange={this.onChange} required value={this.state.email} />
              {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
            </div>
            <div className="input-field col s12">
              <input placeholder="Password" type="password"  onChange={this.onChange} className="validate" required name="password" value={this.state.password}/>
              {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
            </div>
          </div>
          <button type="submit" className="btn btn-dark">Submit</button>
        </form>
        </div>
      )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(Login);
