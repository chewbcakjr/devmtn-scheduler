import { Component, OnInit } from '@angular/core';
import {TemplatesService} from '../templates.service';
import {EventsService} from '../events.service';
import { Router, ActivatedRoute }                from '@angular/router';
import { Template } from '../task/task';
import { Event } from '../event/event';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.scss']
})
export class TemplateListComponent implements OnInit {
	templates: any[];
	template = new Template();
	event = new Event();
		template_id: number;






  constructor(private templatesService: TemplatesService, private eventsService: EventsService, private route: ActivatedRoute) { }

  ngOnInit() {
		// var id = this.route.params.subscribe(parms = > {
		// 	var id = +parmas["id"];
		// })
		// var template_id = template.id;
		this.templatesService.getTmpls()
		.subscribe(templates => this.templates = templates);

		this.eventsService.getEvents(this.template.tmpl_id)
		.subscribe(
			event => this.event = event,
			response => {
				if (response.status = 404) {
					console.log('notfound');
				}
			})
  }



}
