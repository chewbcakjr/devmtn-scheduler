update event
	set name = $2, start_time = $3, end_time = $4, default_instructor = $5, notes = $6, day_number = $7
	where event_id = $1;