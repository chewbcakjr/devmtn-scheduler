import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators }  from '@angular/forms';
import { TemplatesService } from '../templates.service';
import { Router, RouterModule } from '@angular/router';
import { Template } from './task';

@Component({
	selector: 'app-task',
	templateUrl: './task.component.html',
	styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
	form: FormGroup;
	temp = new Template();
	template;
	constructor(fb: FormBuilder, private templatesService: TemplatesService, private router: Router) {

		// this.form = fb.group({
		// 	priority: [''],
		// 	name: ['', Validators.required],
		// 	people: [''],
		// });
		this.form = fb.group({
			name: ['', Validators.required]
		})
	}
	ngOnInit() {
		console.log(this.temp);
	}
	createTemplate(template) {
		this.templatesService.createTemplate(name)
		.subscribe(data => {
			this.template = data;
		})
		console.log(this.form.value);
		this.router.navigate(['/event']);

		//service will need to go here since service will actually be sending the data
		//     addTask(task){
		// return this._http.post(this._url, JSON.stringify(user))
		//   .map(res => res.json());
		// }
	}
}
