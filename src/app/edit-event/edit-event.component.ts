import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss']
})
export class EditEventComponent implements OnInit {

  constructor(private eventsService:EventsService, private router:Router) { }

  ngOnInit() {
  	this.eventsService.updateEvent(72,'updating event?', 'yesterday', 'today', 'me','notes here',2)
  		.subscribe(() => {
  			console.log('redirect will happen here')
  			// here's the logic to redirect. when we move it out of ngOnInit, uncomment this.
  			// this.router.navigate(['/template'])
  		})
  }

}
