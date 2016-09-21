import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss']
})
export class EditEventComponent implements OnInit {
	private eventId : number;
	event: {};
  constructor(private eventsService:EventsService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {
		//  var eventId  = this.route.params.subscribe(params => {
		// 	var eventId = +params['id'];
		// 	console.log(eventId);
		// 	this.eventsService.updateEvent(eventId,'updating event?', 'yesterday', 'today', 'me','notes here',2)
		// })
	}

  	updateEvent() {
			this.eventsService.updateEvent(1,'updating event?', 'yesterday', 'today', 'me','notes here',2)
  		.subscribe(() => {
  			console.log('redirect will happen here')
  			// here's the logic to redirect. when we move it out of ngOnInit, uncomment this.
  			// this.router.navigate(['/template'])
  		})
  }

}



	// editEvent(name) {
	// 		this.eventsService.updateEvent(72,'updating event?', 'yesterday', 'today', 'me','notes here',2)
	// 		.subscribe(data => {
	// 			this.router.navigate(['/template']);
	// 			console.log(data);
	// 		})
	// }

}
