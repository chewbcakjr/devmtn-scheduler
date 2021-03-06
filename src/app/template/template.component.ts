import { Component, OnInit } from '@angular/core';
import { TemplatesService } from '../templates.service';
import { EventsService } from '../events.service';
import { ActivatedRoute, Params } from  '@angular/router';

@Component({
	selector: 'app-template',
	templateUrl: './template.component.html',
	styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {

	constructor(private templatesService: TemplatesService, private eventsService: EventsService, private route: ActivatedRoute) { }

	events = [];
	week = [];
  weeks = [];

	ngOnInit() {
		console.log(this.templatesService.currTmpl)
		// this.eventsService.count = 0
		console.log('reinitialize template component')
		console.log('id', this.templatesService.currTmpl.template_id)
		this.eventsService.getEvents(this.templatesService.currTmpl.template_id).subscribe(data => {
			console.log(data)
			// for (let i = 1; i <= data.length; i++) {
			// 	let mult = data.filter(event => event.day_number == i)
			// 	if (mult.length > 0) {
			// 		this.events.push(mult)
			// 	}
			// }

			this.route.params.forEach((params: Params) => {
      let weeknum = +params['weeknum'];
			// console.log(this.eventsService.weeks)
			this.week = this.eventsService.weeks[weeknum-1];
			console.log(this.week)
			// this.week = this.eventsService.week
    })




			// console.log('week', this.week)
			// console.log('data', this.events)
		})
	}
}
