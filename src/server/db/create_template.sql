insert into template (name)
	values ($1)
returning template_id, name;

