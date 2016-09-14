import { Component, OnInit } from '@angular/core';
import {TemplatesService} from '../templates.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {


  constructor(private templatesService: TemplatesService) { }
	templates: string;
  // ngOnInit():void {
	// 	this.templatesService.getTmpls()
	// 	.subscribe(data => {
	// 		console.log(data);
	// 		this.templates = data;
  // })

// }
ngOnInit() {
	console.log(this.templates);
}
}
