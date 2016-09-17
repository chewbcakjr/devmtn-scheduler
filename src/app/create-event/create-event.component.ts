import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventsService } from '../events.service';
import { TemplatesService } from '../templates.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Event } from './create-event';
@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {
	form: FormGroup;
	event = new Event();

  constructor(private eventsService:EventsService, private templatesService:TemplatesService, fb:FormBuilder) {
		this.form = fb.group({
			      name: ['', Validators.required],
			      day_number: [''],
						start_time: [''],
						end_time: [''],
			      default_instructor: [''],
						notes: ['']
					})
				}

  ngOnInit():void {
    console.log(this.templatesService.currTmpl);
    this.eventsService.createEvent(this.templatesService.currTmpl.template_id,'Blah','now', 'never', 'you', 'nuff not said', 1)
    .subscribe(data => {
      console.log(data);
    })
  }
	createEvent(tmpl_id:number, name:string, start_time:string, end_time:string, default_instructor:string, notes:string, day_number:number) {
		this.eventsService.createEvent(this.templatesService.currTmpl.template_id, name, start_time, end_time, default_instructor, notes, day_number)
			.subscribe(data => {
				console.log(data);
			})
	}

}
