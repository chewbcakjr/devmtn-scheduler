import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { EventsService } from '../events.service';
import { TemplatesService } from '../templates.service';
import { Router } from '@angular/router';
import { Event } from './event';

declare var $:any;

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {
	event = new Event();

  constructor(private eventsService:EventsService, private templatesService:TemplatesService, private router:Router) { }

  createEvent(title:string, start:string, end:string, instructor:string, links:string, day:number) {
    start = start.concat(":00");
    end = end.concat(":00");
    let weekNum = Math.ceil(day/7);
    this.eventsService.createEvent(this.templatesService.currTmpl.template_id, title, start, end, instructor, links, day)
      .subscribe(data => {
        console.log(data);
        this.router.navigate(['/template', weekNum])

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
  }
}
