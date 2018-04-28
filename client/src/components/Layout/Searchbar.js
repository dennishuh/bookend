import React, { Component } from 'react';
import axios from 'axios';

class Searchbar extends Component {
  state = {
    terms: ''
  }

  handleChange(e) {
    this.setState({
      terms: e.target.value
    });
  }

  searchSubmit(e) {
    e.preventDefault();
    axios(`https://www.googleapis.com/books/v1/volumes?q={this.state.terms}&key=AIzaSyDNTOHAplRlEbbtUClRhPe9NeVUqWVFZkY`)
      .then(res => console.log(res.data))

    // AIzaSyDNTOHAplRlEbbtUClRhPe9NeVUqWVFZkY
  }

  render() {
    return (
      <div className="row">
        <form onSubmit={this.searchSubmit.bind(this)}>
          <div className="row valign-wrapper">
            <div className="input-field col s7 m9">
              <input onChange={this.handleChange.bind(this)} placeholder="Search by Title/Author" id="search" type="text" className="validate" name="terms" aria-label="Book Search" />
            </div>
            <div className="col s5 m3">
              <button type="submit" className="waves-effect waves-light btn">Submit</button>
            </div>
          </div>
        </form>
      </div>
    );
  }

}

export default Searchbar;
