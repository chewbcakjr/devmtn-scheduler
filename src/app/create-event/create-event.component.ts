import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventsService } from '../events.service';
import { TemplatesService } from '../templates.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {
	form: FormGroup;

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

}
