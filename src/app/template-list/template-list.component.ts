import { Component, OnInit } from '@angular/core';
import { TemplatesService } from '../templates.service';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.scss']
})
export class TemplateListComponent implements OnInit {

  constructor(private templatesService:TemplatesService) { }
  data:string = ''
  ngOnInit():void {
  	this.templatesService.getTmpls()
  		.subscribe(data => {
  			console.log(data);
  			console.log('working')
  			this.data = data;
  		})
  }

}
