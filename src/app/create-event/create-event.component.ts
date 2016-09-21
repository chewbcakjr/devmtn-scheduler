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

  createEvent(title:string, start:string, end:string, instructor:string, links:string, day:number) {
    start = start.concat(":00");
    end = end.concat(":00");
    this. eventsService.createEvent(this.templatesService.currTmpl.template_id, title, start, end, instructor, links, day)
      .subscribe(data => {
        console.log(data);

      })
  }

  ngAfterViewInit() {
    $('#timepicker-start').pickatime({
      default: '12:00',
      autoclose: true,
      twelvehour: false
    });
    $('#timepicker-end').pickatime({
      default: '12:00',
      autoclose: true,
      twelvehour: false
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
