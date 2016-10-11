import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { EventsService } from '../events.service';
import { Router } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss']
})
export class EditEventComponent implements OnInit {
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
    
  }

  ngAfterViewInit() {
    this.currEvent = this.eventsService.currEvent;
    $("[id=timepicker-start]").pickatime({
      default: this.item.start_time,
      autoclose: true,
      twelvehour: false,
    });
    $("[id=timepicker-end]").pickatime({
      default: this.item.end_time,
      autoclose: true,
      twelvehour: false,
    });
  }

  updateEvent(name:string, start_time:string, end_time:string, default_instructor:string, notes:string, day_number:number) {

    let weekNum = Math.ceil(day_number/7);
    this.eventsService.updateEvent(this.eventsService.currEvent.event_id, name, start_time, end_time, default_instructor, notes, day_number)
      .subscribe(() => {
        $(`#${this.item.event_id}`).closeModal();
        this.router.navigate(['/template', weekNum])
      })
  }

  removeEvent(event_id:number) {
    console.log('removing id #', event_id)
    this.eventsService.removeEvent(event_id)
      .subscribe()
  }

}
