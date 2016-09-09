var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session');
var passport = require('passport');
var gcal = require('google-calendar');
var config = require('./config');
var google = require('googleapis');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

var calendar = google.calendar('v3');
var tasks = google.tasks('v1');
console.log(calendar);

var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2(config.consumer_key, config.consumer_secret, '/auth/google/callback');
google.options({auth: oauth2Client}); // set auth as a global default

//App Init
var app = express();
var port = 9001;

//Middleware
app.use(bodyParser.json());
var corsOptions = {
	origin: 'http://localhost:9001'
};
app.use(cors(corsOptions));
app.use(express.static(__dirname + '/../../../build')); //serve all of our static front-end files from our server.
app.use(session({ secret: config.session_secret, resave: true, saveUninitialized: true }));

//Passport
passport.serializeUser(function (user, cb) {
	cb(null, user);
});
passport.deserializeUser(function (obj, cb) {
	cb(null, obj);
});
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
	clientID: config.consumer_key,
	clientSecret: config.consumer_secret,
	callbackURL: "http://localhost:" + port + "/auth/google/callback",
	scope: ['openid', 'email', 'https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/tasks']
}, function (accessToken, refreshToken, profile, done) {

	console.log("Auth Success. Celebration is in order.");

	console.log("Access Token: ", accessToken);

	oauth2Client.setCredentials({ access_token: accessToken, refresh_token: refreshToken });

	return done(null, profile);
}));

//Auth Routing
app.get('/auth/google', passport.authenticate('google'));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), function (req, res) {
	// Successful authentication, redirect home.
	res.redirect('/');
});

// -------------------------------CALENDARS-------------------------------- //
// GET A LIST OF THE USER'S CALENDARS
app.get('/calendars', function (req, res, next) {
	calendar.calendarList.list({
		auth: oauth2Client
	}, function (err, calendars) {
		if (err) {
			console.log('error returning user\'s calendars: ' + err);
			res.send('err');
		} else {
			res.send(calendars);
		}
	});
});

// CREATE A NEW CALENDAR
app.post('/calendars', function (req, res) {
	var newCalendar = {
		// summary: 'DevMountain Cohort Schedule 3'
		summary: 'New Calendar'
	};

	calendar.calendars.insert({
		auth: oauth2Client,
		resource: newCalendar
	}, function (err, calendar) {
		if (err) {
			console.log('There was an error contacting the Calendar service: ' + err);
			// return;
			res.send('err');
		}
		res.send('Calendar created: %s', calendar);
	});
});

// DELETE A CALENDAR
app.delete('/calendars', function(req, res) {
	calendar.calendars.delete({
		auth: oauth2Client,
		calendarId: 'miskoj51ort203omh5ubss59tg@group.calendar.google.com'
	}, function (err, resp) {
		if (err) {
			console.log('error deleting: ' + err);
			res.send('err');
		} else {
			res.send(resp);
		}
	})
})
// -------------------------------CALENDARS-------------------------------- //


// ---------------------------------EVENTS---------------------------------- //
// CREATE A NEW EVENT
app.post('/events', function (req, res, next) {
	var newEvent = {
		'summary': 'Event created via nodemon and postman',
		'location': '560 S 100 W St, Provo, UT 84601',
		'description': 'Ta Da!!!',
		'start': {
			'dateTime': '2016-09-08T13:00:00',
			'timeZone': 'America/Denver'
		},
		'end': {
			'dateTime': '2016-09-08T14:00:00',
			'timeZone': 'America/Denver'
		},
		'recurrence': [
			// 'RRULE:FREQ=WEEKLY;COUNT=1'
		],
		'attendees': [{
			'email': 'mrevanwitt@gmail.com'
		}, {
			'email': 'akang2@gmail.com'
		}
		// , {
		// 	'email': 'jeremy@devmounta.in'
		// }
		// , {
		// 	'email': 'jeremy@devmounta.in'
		// }
		// , {
		// 	'email': 'jeremy@devmounta.in'
		// }
		],
		'reminders': {
			'useDefault': false,
			'overrides': [{
				'method': 'email',
				'minutes': 24 * 60
			}]
		},
		sequence: 1
	};

	calendar.events.insert({
		auth: oauth2Client,
		calendarId: '3luc0md0o7gmrscugapr5lvn2g@group.calendar.google.com',
		resource: newEvent,
		sendNotifications: false
	}, function (err, event) {
		if (err) {
			console.log('There was an error contacting the Calendar service: ' + err);
			// return;
			res.send(err);
		} else {
			res.send('Event created: %s', event.htmlLink);
			// res.redirect('/');
		}
	});
});
// ---------------------------------EVENTS---------------------------------- //


// ------------------------------TASK LISTS-------------------------------- //
// GET A LIST OF THE USER'S TASK LISTS
app.get('/tasklists', function (req, res, next) {
	tasks.tasklists.list({
		auth: oauth2Client
	}, function (err, tasklists) {
		if (err) {
			res.send('error returning user\'s task lists: ' + err);
		} else {
			res.send(tasklists);
		}
	});
});

// CREATE NEW TASK LIST
app.post('/tasklists', function (req, res, next) {
	var newTaskList = {
		title: 'New Task List'
	};

	tasks.tasklists.insert({
		auth: oauth2Client,
		resource: newTaskList
	}, function (err, tasklist) {
		if (err) {
			res.send('error creating new task list: ' + err);
		} else {
			res.send(tasklist);
		}
	});
});
// ------------------------------TASK LISTS-------------------------------- //


// ---------------------------------TASKS----------------------------------- //
// GET A LIST OF TASKS
app.get('/tasks', function (req, res, next) {
	tasks.tasks.list({
		auth: oauth2Client,
		tasklist: 'MTU0OTY5Njk1NTM4NzgwNjY5MDg6MDow'
	}, function (err, tasks) {
		if (err) {
			console.log('error returning task list: ' + err);
			res.send('err');
		} else {
			res.send(tasks);
		}
	});
});

// CREATE NEW TASK 
app.post('/tasks', function (req, res, next) {
	var newTask = {

		title: 'New Task'
	};

	tasks.tasks.insert({
		auth: oauth2Client,
		tasklist: 'MTU0OTY5Njk1NTM4NzgwNjY5MDg6MDow',
		resource: newTask
	}, function (err, task) {
		if (err) {
			res.send('error creating new task list: ' + err);
		} else {
			res.send(task);
		}
	});
});
// ---------------------------------TASKS----------------------------------- //

//Listen
app.listen(port, function () {
	console.log('Listening on port ', port);
});