select * from event
where template_id = $1 ORDER BY start_time;
