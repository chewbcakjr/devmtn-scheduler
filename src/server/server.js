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
// 1. GET A LIST OF THE USER'S CALENDARS
app.get('/calendars', function (req, res, next) {
	calendar.calendarList.list({
		auth: oauth2Client
	}, function (err, calendars) {
		if (err) {
			console.log('error returning user\'s calendars: ' + err);
			res.send('err');
		} else {
			// can get ids and names from this items array
			res.send(calendars);
		}
	});
});

// 2. CREATE A NEW CALENDAR
app.post('/calendars', function (req, res) {
	var newCalendar = {
		summary: req.body.name
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
		// can get id and name from this 
		res.send(calendar);
	});
});

// 3. DELETE A CALENDAR
app.delete('/calendars', function(req, res) {
	calendar.calendars.delete({
		auth: oauth2Client,
		calendarId: req.body.calendarId
	}, function (err, resp) {
		if (err) {
			console.log('error deleting: ' + err);
			res.send('err');
		} else {
			res.send(resp);
		}
	})
})

// 4. MODIFY A CALENDAR
app.put('/calendars', function(req, res) {
	// command: calendar.calendars.patch
	// need: calendar id
	// params: description, location, summary (name), timeZone
	var modifiedCalendar = {
		summary: req.body.summary, 
		description: req.body.description,
		location: req.body.location,
		timeZone: req.body.timeZone
	}

	calendar.calendars.patch({
		auth: oauth2Client,
		calendarId: req.body.calendarId,
		resource: modifiedCalendar
	}, function(err, modifiedCal) {
		if (err) {
			console.log('error modifying calendar: ' + err);
			res.send('err');
		} else {
			res.send(modifiedCal);
		}
	})
})
// -------------------------------CALENDARS-------------------------------- //


// ---------------------------------EVENTS---------------------------------- //

// 5. GET A LIST OF EVENTS ON SPECIFIED CALENDAR (needs post)
app.post('/events', function(req, res) {
	// command: calendar.events.list
	// need: calendar id
	calendar.events.list({
		auth: oauth2Client,
		calendarId: req.body.calendarId
	}, function (err, events) {
		if (err) {
			console.log('error returning events: ' + err);
			res.send('err');
		} else {
			res.send(events);
		}
	}

	})
})


// 6. CREATE A NEW EVENT
app.post('/events', function (req, res, next) {
	
	var attendees = [];
	req.body.attendees.forEach( function(email) {
		attendees.push({email: email})
	});

	var newEvent = {
		'summary': req.body.name,
		'location': req.body.location,
		'description': req.body.description,
		'start': {
			'dateTime': req.body.start,
			'timeZone': req.body.timeZone
		},
		'end': {
			'dateTime': req.body.end,
			'timeZone': req.body.timeZone
		},
		'attendees': attendees,
		'reminders': {
			'useDefault': false,
			'overrides': [{
				'method': 'email',
				'minutes': 24 * 60
			}]
		},
		// sequence: 1
	};

	calendar.events.insert({
		auth: oauth2Client,
		calendarId: req.body.calendarId,
		resource: newEvent,
		sendNotifications: false
	}, function (err, event) {
		if (err) {
			console.log('There was an error contacting the Calendar service: ' + err);
			// return;
			res.send(err);
		} else {
			res.send(event);
			// res.redirect('/');
		}
	});
});

//  7. DELETE AN EVENT
app.delete('/events', function(req, res) {
	// command: calendar.events.delete
	// need: eventId
})

// 8. MODIFY AND EVENT
app.put('/events', function(req, res) {
	// command: calendar.events.patch
	// need: calendarId, eventId
	// params: same as create event
})
// ---------------------------------EVENTS---------------------------------- //


// ------------------------------TASK LISTS-------------------------------- //
// 9. GET A LIST OF THE USER'S TASK LISTS
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

// 10. CREATE NEW TASK LIST
app.post('/tasklists', function (req, res, next) {
	var newTaskList = {
		title: req.body.name
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

// 11. DELETE A TASK LIST
app.delete('/tasklists', function(req, res) {
	// command: tasks.tasklists.delete
	// need: tasklistId
})

// 12. MODIFY A TASK LIST
app.put('/tasklists', function(req, res) {
	// command: tasks.tasklists.patch
	// need: tasklistId
	// params: title
})
// ------------------------------TASK LISTS-------------------------------- //


// ---------------------------------TASKS----------------------------------- //
// 13. GET A LIST OF TASKS - needs to be post to accept tasklistId
app.post('/tasks', function (req, res, next) {
	tasks.tasks.list({
		auth: oauth2Client,
		tasklist: req.body.tasklistId
	}, function (err, tasks) {
		if (err) {
			console.log('error returning task list: ' + err);
			res.send('err');
		} else {
			res.send(tasks);
		}
	});
});

// 14. CREATE NEW TASK 
app.post('/tasks', function (req, res, next) {
	// params: completed, due, notes, status, title
	var newTask = {

		title: req.body.name
	};

	tasks.tasks.insert({
		auth: oauth2Client,
		tasklist: req.body.tasklistId,
		resource: newTask
	}, function (err, task) {
		if (err) {
			res.send('error creating new task list: ' + err);
		} else {
			res.send(task);
		}
	});
});

// 15. DELETE TASK
app.delete('/tasks', function(req, res) {
	tasks.tasks.delete({
		auth: oauth2Client,
		tasklist: req.body.tasklistId,
		task: req.body.taskId
	}, function (err, resp) {
		if (err) {
			console.log('error deleting task: ' + err);
			res.send('err');
		} else {
			res.send(resp);
		}
	})
})

// 16. MODIFY TASK
app.put('/tasks', function(req, res) {
	// command: tasks.tasks.patch
	// need: tasklistId, taskId
	// params: completed, due, notes, status, title
})
// ---------------------------------TASKS----------------------------------- //

//Listen
app.listen(port, function () {
	console.log('Listening on port ', port);
});