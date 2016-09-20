select * from event
where template_id = $1 ORDER BY day_number, start_time;
