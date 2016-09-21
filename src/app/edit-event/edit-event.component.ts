import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';
import { Router } from '@angular/router';
import { TemplatesService } from '../templates.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss']
})
export class EditEventComponent implements OnInit {
	event_id = 1;

  constructor(private eventsService:EventsService, private router:Router ,private templatesService: TemplatesService) { }

  ngOnInit() {
			
  	// this.eventsService.updateEvent(72,'updating event?', 'yesterday', 'today', 'me','notes here',2)
  	// 	.subscribe(() => {
  	// 		console.log('redirect will happen here')
  	// 		// here's the logic to redirect. when we move it out of ngOnInit, uncomment this.
  	// 		// this.router.navigate(['/template'])
  	// 	})
  }
	updateEvent(title:string, start:string, end:string, instructor:string, links:string, day:number) {
		start = start.concat(":00");
		end = end.concat(":00");
		let weekNum = Math.ceil(day/7);
		this.eventsService.updateEvent(this.event_id, title, start, end, instructor, links, day)
			.subscribe(data => {
				console.log(data);
				this.router.navigate(['/template', weekNum])
		})
	}
}
