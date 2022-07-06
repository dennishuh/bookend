const express = require('express');
const path = require('path');
const hbs = require('express-hbs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const moment = require('moment');
const keys = require('./config/keys');

const { ensureAuthenticated } = require('./helpers/auth');

const PORT = process.env.PORT || 5000;
const app = express();

require('./config/passport')(passport);

// Load routes
const books = require('./routes/books');
const users = require('./routes/users');
const list = require('./routes/list');

mongoose
	.connect(keys.mongoURI)
	.then(() => {
		console.log('mongoURI', keys.mongoURI);
		console.log('MongoDB connected...');
	})
	.catch((err) => console.log(err));

hbs.registerHelper('moment', function (date, format) {
	return moment(date).format(format);
});

hbs.registerHelper('timeDifference', function (fromDate, toDate) {
	return moment(toDate).from(fromDate, true);
});

hbs.registerHelper('truncate', function (str, len) {
	if (!str) {
		return;
	}
	if (str.length > len && str.length > 0) {
		var new_str = str + ' ';
		new_str = str.substr(0, len);
		new_str = str.substr(0, new_str.lastIndexOf(' '));
		new_str = new_str.length > 0 ? new_str : str.substr(0, len);
		return new_str + '...';
	}
	return str;
});

// Use `.hbs` for extensions and find partials in `views/partials`.
app.engine(
	'hbs',
	hbs.express4({
		partialsDir: __dirname + '/views/partials',
		defaultLayout: __dirname + '/views/layouts/main',
	})
);

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride('_method'));

app.use(
	session({
		secret: 'super secret key',
		resave: true,
		cookie: { maxAge: 168 * 60 * 60 * 1000 },
		saveUninitialized: true,
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(function (req, res, next) {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	res.locals.user = req.user || null;
	res.locals.prod = process.env.NODE_ENV === 'production' ? true : false;
	next();
});

app.get('/', (req, res) => {
	if (req.isAuthenticated()) {
		res.redirect('/books');
	} else {
		const data = {
			title: 'Welcome!',
		};
		res.render('index', data);
	}
});

app.get('/about', (req, res) => {
	res.render('about');
});

// Use routes
app.use('/books', books);
app.use('/list', list);
app.use('/users', users);

app.listen(PORT, () => {
	console.log('Server started on ' + PORT);
});
