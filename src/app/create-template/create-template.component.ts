import { Component, OnInit } from '@angular/core';
import { TemplatesService } from '../templates.service';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators }  from '@angular/forms';

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.scss']
})
export class CreateTemplateComponent implements OnInit {
		form: FormGroup;

  constructor(fb: FormBuilder, private templatesService: TemplatesService, private router: Router) {
		this.form = fb.group({
				name: ['', Validators.required]
			})
	 }

  ngOnInit() {
  }
	createTmpl(name:string) {
  	this.templatesService.createTmpl(name)
		console.log(name);
  		// .subscribe(data => {
  			// console.log(data);
  			// this.newTmpl = data;
  		// })
  }
}
