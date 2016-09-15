import { Component, OnInit } from '@angular/core';
import { TemplatesService } from '../templates.service';
import { EventsService } from '../events.service';
import { Template } from '../task/task';
import { Event } from '../create-event/event';


@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.scss']
})
export class TemplateListComponent implements OnInit {

  constructor(private templatesService:TemplatesService,
              private eventsService:EventsService) { }

  // these will not stay as strings. just defining them for now to get the front to back working
  tmplList:any[] = [];
  newTmpl:string = '';
  tmplList: any;
template = new Template();
event = new Event();
 template_id: number;
 name: string;
 templates;


  // this will get the list of templates from the db and load them up and put them onto the data property. this will need to be tweaked probably once there's actually data. maybe not, data would be an object with the template id and template name (program name)
  ngOnInit():void {

  	// this.eventsService.getEvents(5)
  	// this.eventsService.createEvent(5,'candice is awesome','now', 'never', 'me', 'nuff said', 1)
  	this.templatesService.getTmpls()
  	// this.templatesService.createTmpl('testing')
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

  // this needs to live somewhere else, but i don't know where yet. and it needs to actually do something besides log the data
  createEvent(tmpl_id:number, name:string, start_time:string, end_time:string, default_instructor:string, notes:string, day_number:number) {
  	this.eventsService.createEvent(tmpl_id, name, start_time, end_time, default_instructor, notes, day_number)
  		.subscribe(data => {
  			console.log(data);
  		})
  }




}
