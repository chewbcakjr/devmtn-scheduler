import { Component, OnInit } from '@angular/core';
import { Template } from './task';
import { FormControl, FormBuilder, FormGroup, Validators }  from '@angular/forms';

@Component({
	selector: 'app-task',
	templateUrl: './task.component.html',
	styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
	template = new Template();
	form: FormGroup;
	constructor(fb: FormBuilder) {

		this.form = fb.group({
			priority: [''],
			title: ['', Validators.required],
			people: [''],
		});
	}
	ngOnInit() {
		console.log(this.template);
	}
	save() {
		console.log(this.form.value);
		//service will need to go here since service will actually be sending the data
		//     addTask(task){
		// return this._http.post(this._url, JSON.stringify(user))
		//   .map(res => res.json());
		// }
	}
}
