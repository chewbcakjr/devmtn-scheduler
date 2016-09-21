import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { EventsService } from '../events.service';
import { TemplatesService } from '../templates.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Event } from './event';


declare var $:any;

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {
	event = {};
	name: string;
	start_time: string;
	end_time: string;
	default_instructor: string;
	notes: string;
	day_number: number;

  constructor(private eventsService:EventsService, private templatesService:TemplatesService, private route: ActivatedRoute) { }

  ngAfterViewInit() {
    $('#timepicker').pickatime({
      default: '12:00',
      autoclose: false,
      twelvehour: true
    });
  }

  ngOnInit():void {
		var id = this.route.params.subscribe(params => {
	  var id = +params["id"];
		  console.log('here is event' + id);
		})
    // this.eventsService.createEvent(this.templatesService.currTmpl.template_id,'Blah','now', 'never', 'you', 'nuff not said', 1)
    // .subscribe(data => {
    //   console.log(data);
  // })
  }


	createEvent() {
		this.eventsService.createEvent(this.templatesService.currTmpl.template_id, this.name, this.start_time, this.end_time, this.default_instructor, this.notes, this.day_number)
			.subscribe(data => {
				console.log('here is create event' + data);
			})
	}
}
