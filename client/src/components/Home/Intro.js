import React from 'react';

import Searchbar from '../Layout/Searchbar';

const Intro = _ => (
  <div className="container">
    <div className="jumbotron text-center">
      <h1 className="display-3">Welcome to Bookend</h1>
      <p className="lead">Read a lot and want to keep track of how many books you've read? Add a book that you've started to read. Then when you finish, it'll add to your book list with how long you've taken.</p>
      <p>To start search for your first book!</p>
      <Searchbar />
    </div>
  </div>
);

export default Intro;
