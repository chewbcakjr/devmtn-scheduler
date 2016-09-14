import { Component, OnInit } from '@angular/core';
import { Event } from './event';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventsService } from '../events.service';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
	form: FormGroup;
	event = new Event();
// instructors: string[]= ['Brett', 'Jeremy', 'Ben Callis'];
instructors: string[] = ['Brett', 'Jeremy', 'Ben'];

  constructor(fb: FormBuilder,
		private eventsService: EventsService
	) {
		this.form = fb.group({
		      name: ['', Validators.required],
		      number: [''],
		      instructor: [''],
					notes: ['']
		    })
	}
	ngOnInit() {
		console.log(this.event);
	}

	save() {
		this.eventsService.createEvent(this.event);

	///need to input service here with http post for this to actually save
	console.log(this.form.value);
	}

}
