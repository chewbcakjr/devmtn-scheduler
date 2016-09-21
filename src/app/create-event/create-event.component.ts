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

  //show me time
  showTime(start_time, end_time) {
    console.log(start_time, end_time);
    // this.eventsService.showTime(time)
  }

  ngAfterViewInit() {
    $('#timepicker-start').pickatime({
      default: '12:00',
      autoclose: true,
      twelvehour: true
    });
    $('#timepicker-end').pickatime({
      default: '12:00',
      autoclose: true,
      twelvehour: true
    });
    $('.timepicker-start').on("hover", function() {
      console.log($(this).text());
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
