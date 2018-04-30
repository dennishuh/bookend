import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Searchbar from '../Layout/Searchbar';

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.replace('/books');
    }
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron text-center">
          <h1 className="display-3">Welcome to Bookend</h1>
          <p className="lead">Read a lot and want to keep track of how many books you've read? Add a book that you've started to read. Then when you finish, it'll add to your book list with how long you've taken.</p>
          <p>To start search for your first book!</p>
          <Searchbar />
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Landing);
