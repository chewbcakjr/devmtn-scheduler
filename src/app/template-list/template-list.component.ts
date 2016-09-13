import { Component, OnInit } from '@angular/core';
import { TemplatesService } from '../templates.service';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.scss']
})
export class TemplateListComponent implements OnInit {

  constructor(private templatesService:TemplatesService) { }

  // these will not stay as strings. just defining them for now to get the front to back working
  tmplList:string = '';
  newTmpl:string = '';

  // this will get the list of templates from the db and load them up and put them onto the data property. this will need to be tweaked probably once there's actually data. maybe not, data would be an object with the template id and template name (program name)
  ngOnInit():void {
  	this.templatesService.getTmpls()
  		.subscribe(data => {
  			console.log(data);
  			this.tmplList = data;
  		})
  }

  // this should be invoked when Jeremy selects "create a new template" and then hits save
  // should it also push to the tmplList so as to not do another db call? would that cause issues with anything?
  createTmpl(name:string) {
  	this.templatesService.createTmpl(name)
  		.subscribe(data => {
  			console.log(data);
  			this.newTmpl = data;
  		})
  }

}
