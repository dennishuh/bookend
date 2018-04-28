import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  state = {
    email: '',
    password: '',
    user: ''
  }

  loginSubmit(e) {
    e.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password
    }

    axios.post('/users/login', data)
      .then(res => {
        this.setState({user: res.data})
      });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  logout() {
    axios.post('/users/logout')
      .then(res => {
        this.setState({
          loggedIn: false,
          user: '',
          email: '',
          password: ''
        })
      });
  }

  render() {
    return this.state.user ? (
        <button onClick={this.logout.bind(this)}>Logout</button>
      ) : (
        <form className="col s12" onSubmit={this.loginSubmit.bind(this)}>
          <h3 className="text-center">Account Login</h3>
          <div className="row">
            <div className="input-field col s12">
              <input placeholder="Email" type="email" name="email" className="validate" onChange={this.handleChange.bind(this)} required value={this.state.email} />
            </div>
            <div className="input-field col s12">
              <input placeholder="Password" type="password"  onChange={this.handleChange.bind(this)} className="validate" required name="password" value={this.state.password}/>
            </div>
          </div>
          <button type="submit" className="btn btn-dark">Submit</button>
        </form>
      )
  }
}

export default Login;
