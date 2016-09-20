import { Component, OnInit } from '@angular/core';
import { EventsService } from '../'

@Component({
  selector: 'app-day-card',
  templateUrl: './day-card.component.html',
  styleUrls: ['./day-card.component.scss']
})
export class DayCardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

	createEvent(tmpl_id:number, name:string, start_time:string, end_time:string, default_instructor:string, notes:string, day_number:number) {
		this.eventsService.createEvent(this.templatesService.currTmpl.template_id, name, start_time, end_time, default_instructor, notes, day_number)
			.subscribe(data => {
				console.log(data);
			})
	}

}
