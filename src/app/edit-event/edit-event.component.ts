import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { EventsService } from '../events.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss']
})
export class EditEventComponent implements OnInit, OnDestroy {
  @Input() item = {};

  constructor(private eventsService:EventsService, private router:Router) { }

  ngOnInit() {
    
  	// this.eventsService.updateEvent(72,'updating event?', 'yesterday', 'today', 'me','notes here',2)
  	// 	.subscribe(() => {
  	// 		console.log('redirect will happen here')
  			// here's the logic to redirect. when we move it out of ngOnInit, uncomment this.
  			// this.router.navigate(['/template'])
  		// })
  }

  updateEvent(event_id:number, name:string, start_time:string, end_time:string, default_instructor:string, notes:string, day_number:number) {
    console.log(arguments)
    let weekNum = Math.ceil(day_number/7);
    this.eventsService.updateEvent(event_id, name, start_time, end_time, default_instructor, notes, day_number)
      .subscribe(() => {
        console.log('updated')
        // $('#modal1').closeModal();
        this.router.navigate(['/template', weekNum])
      })
  }

  ngOnDestroy() {
    console.log('destroyed')
    this.item = {};
  }
}
