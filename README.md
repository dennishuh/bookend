# Book End

A simple app that lets you keep track of books you read and finish

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Install mongo on your local machine or create a new free sandbox mongodb on mlab.

To install locally go to:
https://www.mongodb.com/

To run mongo from mlab, please visit mlab and create a login and then create a free sandbox database

To get the app running locally, create a dev.js file and export two values in it. the googleAPIKey and mongoURI

```
// dev.js
module.exports = {
  googleAPIKey: 'YOUR GOOGLE BOOKS API',
  mongoURI: 'YOUR LOCAL MONGO URI'
};
```

### Installing

Install all dependencies

```
npm i
```

## Built With
* Node
* Express
* Handlebars


## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

* **Dennis Huh** - *Initial work* - [Dennis Huh](https://github.com/dennishuh)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
