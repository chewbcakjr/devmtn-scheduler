insert into event
	(template_id, name, start_time, end_time, default_instructor, notes, day_number)
	values ($1, $2, $3, $4, $5, $6, $7)
	returning template_id, name, start_time, end_time, default_instructor, notes, day_number;