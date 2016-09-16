var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var config = require('./config');
// var gcal = require('google-calendar');

var google = require('googleapis');
var calendar = google.calendar('v3');
var tasks = google.tasks('v1');
var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2(config.consumer_key, config.consumer_secret, '/auth/google/callback');
google.options({auth: oauth2Client}); // set auth as a global default

var massive = require('massive');
var connectionString = 'postgres://'+config.db_userName+':'+config.db_password+'@'+config.db_hostName+'.db.elephantsql.com:5432/'+config.db_userName;
var massiveInstance = massive.connectSync({
	connectionString: connectionString
});


//App Init
var app = express();
var port = 9001;

app.set('db', massiveInstance);
var db = app.get('db');

//Middleware
app.use(bodyParser.json());
var corsOptions = {
	// need to change this once we build/bundle
	origin: 'http://localhost:4200'
};
app.use(cors(corsOptions));
app.use(express.static(__dirname + '/../../dist'));
app.use(session({ secret: config.session_secret, resave: true, saveUninitialized: true }));

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

passport.serializeUser(function (user, cb) {
	cb(null, user);
});
passport.deserializeUser(function (obj, cb) {
	cb(null, obj);
});

//Auth Routing
app.get('/auth/google', passport.authenticate('google'));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), function (req, res) {
	// Successful authentication, redirect home. switch the res.redirect (comment/uncomment once we build/bundle)
	// res.redirect('/');
	res.redirect('http://localhost:4200')
	// res.redirect('/calendars/')
});

app.get('/auth/me', function(req, res) {
	console.log(req.user)
	// res.send(req.user)

	res.send(oauth2Client)

})

// -------------------------------CALENDARS-------------------------------- //
// 1. GET A LIST OF THE USER'S CALENDARS
app.get('/calendars/', function(req, res) {
        calendar.calendarList.list({
            auth: oauth2Client
        }, function(err, calendars) {
            if (err) {
                console.log('error returning user\'s calendars: ' + err);
                res.send('err');
            } else {
                // can get ids and names from this items array
                res.json(calendars.items);
                // req.user.calendars = calendars;
                // console.log(req.user.calendars)
                // res.redirect('http://localhost:4200')
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
			console.log('error creating calendar: ' + err);
			// return;
			res.send('err');
		}
		// can get id and name from this
		res.send(calendar);
	});
});

// 3. MODIFY A CALENDAR
app.put('/calendars', function(req, res) {
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
	}, function(err, calendar) {
		if (err) {
			console.log('error modifying calendar: ' + err);
			res.send('err');
		} else {
			res.send(calendar);
		}
	})
})

// 4. DELETE A CALENDAR
app.delete('/calendars', function(req, res) {
	calendar.calendars.delete({
		auth: oauth2Client,
		calendarId: req.body.calendarId
	}, function (err, result) {
		if (err) {
			console.log('error deleting calendar: ' + err);
			res.send('err');
		} else {
			res.send(result);
		}
	})
})
// -------------------------------CALENDARS-------------------------------- //


// ---------------------------------EVENTS---------------------------------- //
// 5. GET A LIST OF EVENTS ON SPECIFIED CALENDAR (needs QUERY!)
app.get('/events', function(req, res) {
	// command: calendar.events.list
	// need: calendar id
	calendar.events.list({
		auth: oauth2Client,
		calendarId: req.query.calendarId
	}, function (err, events) {
		if (err) {
			console.log('error returning events: ' + err);
			res.send('err');
		} else {
			res.send(events);
		}
	})
})


// 6. CREATE A NEW EVENT
app.post('/events', function (req, res) {

	// put this in the service or something
	var attendees = [];
	req.body.attendees.forEach( function(email) {
		attendees.push({email: email})
	});

	var newEvent = {
		summary: req.body.name,
		location: req.body.location,
		description: req.body.description,
		start: {
			dateTime: req.body.start,
			timeZone: req.body.timeZone
		},
		guestsCanModify: true,
		end: {
			dateTime: req.body.end,
			timeZone: req.body.timeZone
		},
		attendees: attendees,
		reminders: {
			useDefault: false,
			overrides: [{
				method: 'email',
				minutes: 24 * 60
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
			console.log('error creating event: ' + err);
			// return;
			res.send(err);
		} else {
			res.send(event);
			// res.redirect('/');
		}
	});
});

// 7. MODIFY AN EVENT
app.put('/events', function(req, res) {
	// put this in the service or something
	var attendees = [];
	req.body.attendees.forEach( function(email) {
		attendees.push({email: email})
	});

	var modifiedEvent = {
		summary: req.body.name,
		location: req.body.location,
		description: req.body.description,
		start: {
			dateTime: req.body.start,
			timeZone: req.body.timeZone
		},
		end: {
			dateTime: req.body.end,
			timeZone: req.body.timeZone
		},
		attendees: attendees,
	}

	calendar.events.patch({
		auth: oauth2Client,
		calendarId: req.body.calendarId,
		eventId: req.body.eventId,
		resource: modifiedEvent
	}, function(err, event) {
		if (err) {
			console.log('error modifying calendar: ' + err);
			res.send('err');
		} else {
			res.send(calendar);
		}
	})
})

// 8. DELETE AN EVENT
app.delete('/events', function(req, res) {
	calendar.events.delete({
		auth: oauth2Client,
		calendarId: req.body.calendarId,
		eventId: req.body.eventId
	}, function (err, result) {
		if (err) {
			console.log('error deleting event: ' + err);
			res.send('err');
		} else {
			res.send(result);
		}
	})
})
// ---------------------------------EVENTS---------------------------------- //


// ------------------------------TASK LISTS-------------------------------- //
// 9. GET A LIST OF THE USER'S TASK LISTS
app.get('/tasklists', function (req, res) {
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
app.post('/tasklists', function (req, res) {
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

// 11. MODIFY A TASK LIST
app.put('/tasklists', function(req, res) {
	var modifiedTasklist = {
		title: req.body.name
	}

	tasks.tasklists.patch({
		auth: oauth2Client,
		tasklist: req.body.tasklistId,
		resource: modifiedTasklist
	}, function(err, tasklist) {
		if (err) {
			console.log('error modifying tasklist: ' + err);
			res.send('err');
		} else {
			res.send(tasklist);
		}
	})
})

// 12. DELETE A TASK LIST
app.delete('/tasklists', function(req, res) {
	tasks.tasklists.delete({
		auth: oauth2Client,
		tasklist: req.body.tasklistId
	}, function (err, result) {
		if (err) {
			console.log('error deleting tasklist: ' + err);
			res.send('err');
		} else {
			res.send(result);
		}
	})
})
// ------------------------------TASK LISTS-------------------------------- //


// ---------------------------------TASKS----------------------------------- //
// 13. GET A LIST OF TASKS - needs to be post to accept tasklistId
app.get('/tasks', function (req, res) {
	tasks.tasks.list({
		auth: oauth2Client,
		tasklist: req.query.tasklistId
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
app.post('/tasks', function (req, res) {
	// params: completed, due, notes, status, title
	var newTask = {
		title: req.body.name,
		notes: req.body.notes,
		due: req.body.due,
		status: 'needsAction'
	};

	tasks.tasks.insert({
		auth: oauth2Client,
		tasklist: req.body.tasklistId,
		resource: newTask
	}, function (err, task) {
		if (err) {
			res.send('error creating new task: ' + err);
		} else {
			res.send(task);
		}
	});
});

// 15. MODIFY TASK
app.put('/tasks', function(req, res) {
	var modifiedTask = {
		title: req.body.name,
		notes: req.body.notes,
		due: req.body.due,
		status: req.body.status
	}

	tasks.tasks.patch({
		auth: oauth2Client,
		tasklist: req.body.tasklistId,
		task: req.body.taskId,
		resource: modifiedTask
	}, function(err, task) {
		if (err) {
			console.log('error modifying task: ' + err);
			res.send('err');
		} else {
			res.send(task);
		}
	})
})

// 16. DELETE TASK
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
// ---------------------------------TASKS----------------------------------- //


// get list of templates
app.get('/templates', function(req, res) {
	db.get_templates(function(err, tmpls) {
		if (err) console.log(err)
		res.status(200).send(tmpls)
	})
	// res.send('yay you got the templates!')
})

// create new template
app.post('/templates', function(req, res) {
	db.create_template(req.body.name, function(err, tmpl) {
		if (err) console.log(err)
		console.log(tmpl);
		res.status(200).send(tmpl)
	})
})

// create event on given template
app.post('/dbevents', function(req, res) {
	db.create_event(req.query.tmpl_id, req.body.name, req.body.start_time, req.body.end_time, req.body.default_instructor, req.body.notes, req.body.day_number, function(err, resp) {
		if (err) console.log(err)
		res.status(200).send(resp)
	})
})

// get a list of events on given template
app.get('/dbevents', function(req, res) {
	db.get_events(req.query.tmpl_id, function(err, events) {
		if (err) console.log(err)
		res.status(200).send(events)
	})
})

// update an event on given template
app.put('/dbevents', function(req, res) {
	db.update_event(req.query.event_id, req.body.name, req.body.start_time, req.body.end_time, req.body.default_instructor, req.body.notes, req.body.day_number, function(err, resp) {
		if (err) console.log(err)
		res.status(200).send(resp)
	})
})

// remove event on given template
app.delete('/dbevents', function(req, res) {
	db.remove_event(req.query.event_id, function(err, resp) {
		if (err) console.log(err)
		res.status(200).send('yay')
	})
})

app.get('/locations', function(req, res) {
	db.get_locations(function(err, locations) {
		if (err) console.log(err)
		res.status(200).send(locations)
	})
})





//Listen
app.listen(port, function () {
	console.log('Listening on port ', port);
});
