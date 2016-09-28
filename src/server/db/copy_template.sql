INSERT INTO event (template_id, name, start_time, end_time, default_instructor, notes, day_number)
     SELECT $1, name, start_time, end_time, default_instructor, notes, day_number
      FROM event WHERE template_id = $2
RETURNING event_id, template_id, name, start_time, end_time, default_instructor, notes, day_number;

