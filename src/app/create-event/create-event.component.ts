import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { EventsService } from '../events.service';
import { TemplatesService } from '../templates.service';

declare var $:any;

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

  constructor(private eventsService:EventsService, private templatesService:TemplatesService) { }

  ngAfterViewInit() {
    $('#timepicker').pickatime({
      default: '12:00',
      autoclose: false,
      twelvehour: true
    });
  }

  ngOnInit():void {
    console.log(this.templatesService.currTmpl);
    // this.eventsService.createEvent(this.templatesService.currTmpl.template_id,'Blah','now', 'never', 'you', 'nuff not said', 1)
    // .subscribe(data => {
    //   console.log(data);
    // })
  }
}
