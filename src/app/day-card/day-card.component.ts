import { Component, OnInit } from '@angular/core';
import {EventsService} from '../events.service';
import {Event} from '../event/event';

@Component({
  selector: 'app-day-card',
  templateUrl: './day-card.component.html',
  styleUrls: ['./day-card.component.scss']
})
export class DayCardComponent implements OnInit {

	allEvents: Event[];

  constructor(private eventsService: EventsService) { }

  ngOnInit() {
		this.loadEvents();
  }
	loadEvents() {
		this.eventsService.getEvents()
		.subscribe(
			events => this.allEvents = events,
			err => {
			console.log(err);
	});
}
}
