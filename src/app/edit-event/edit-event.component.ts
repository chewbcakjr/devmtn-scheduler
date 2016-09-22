import { Component, OnInit, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { EventsService } from '../events.service';
import { Router } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss']
})
export class EditEventComponent implements OnInit, OnDestroy {
  @Input() item = {
    event_id: null, 
    start_time: null, 
    end_time: null, 
    default_instructor: null, 
    notes: null, 
    name: null, 
    day_number: null
  };

  constructor(private eventsService:EventsService, private router:Router) { }

  currEvent = {};

  ngOnInit() {
    // this doesn't work :/
    this.currEvent = this.eventsService.currEvent;
    console.log(this.item)
    
  	// this.eventsService.updateEvent(72,'updating event?', 'yesterday', 'today', 'me','notes here',2)
  	// 	.subscribe(() => {
  	// 		console.log('redirect will happen here')
  			// here's the logic to redirect. when we move it out of ngOnInit, uncomment this.
  			// this.router.navigate(['/template'])
  		// })
  }

  ngAfterViewInit() {
    this.currEvent = this.eventsService.currEvent;
    console.log(this.currEvent)
    $('#timepicker-start').pickatime({
      default: this.item.start_time.slice(0,-3),
      autoclose: true,
      twelvehour: false
    });
    $('#timepicker-end').pickatime({
      default: this.item.end_time.slice(0,-3),
      autoclose: true,
      twelvehour: false
    });
  }

  updateEvent(name:string, start_time:string, end_time:string, default_instructor:string, notes:string, day_number:number) {
    console.log(arguments)
    start_time = start_time.concat(":00");
    end_time = end_time.concat(":00");
    let weekNum = Math.ceil(day_number/7);
    this.eventsService.updateEvent(this.eventsService.currEvent.event_id, name, start_time, end_time, default_instructor, notes, day_number)
      .subscribe(() => {
        console.log('updated')
        // $('#modal1').closeModal();
        $(`#${this.item.event_id}`).closeModal();
        this.router.navigate(['/template', weekNum])
      })
  }

  ngOnDestroy() {
    // console.log('destroyed')
    // this.item = {};
  }
}
