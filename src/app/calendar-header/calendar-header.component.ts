import { Component, OnInit } from '@angular/core';
import { TemplatesService } from '../templates.service';
import { EventsService } from '../events.service';

declare var $:any;

@Component({
	selector: 'app-calendar-header',
	templateUrl: './calendar-header.component.html',
	styleUrls: ['./calendar-header.component.scss']
})
export class CalendarHeader implements OnInit {

	constructor(private templatesService: TemplatesService, private eventsService: EventsService) { }

	//trigger the go-live modal
	ngAfterViewInit() {
				$('.modal-trigger').leanModal();
	}


	currTmpl = {};

	weeks = [
		'ONE',
		'TWO',
		'THREE',
		'FOUR',
		'FIVE',
		'SIX',
		'SEVEN',
		'EIGHT',
		'NINE',
		'TEN',
		'ELEVEN',
		'TWELVE',
		'THIRTEEN',
		'FOURTEEN',
		'FIFTEEN',
		'SIXTEEN'
	];


	currWeek = this.weeks[0];

	ngOnInit() {
		this.currTmpl = this.templatesService.currTmpl;
	}

	nextWeek() {
		// console.log('nextWeek')
		for (var i = 0; i <= this.weeks.length; i++) {
			if (this.weeks[i] === this.currWeek) {
				if (this.currWeek === this.weeks[0] + (this.weeks.length - 1)) {
					this.currWeek = this.weeks[0] + this.weeks.length;
				} else {
					this.currWeek = this.weeks[i + 1]
					break;
				}
			}
		}
    this.eventsService.increment();

	}
	lastWeek() {
		// console.log('lastWeek')
		for (var i = 0; i <= this.weeks.length; i++) {
			if (this.weeks[i] === this.currWeek) {
				if (this.currWeek === this.weeks[0]) {
					this.currWeek = this.weeks[0]
				} else {
					this.currWeek = this.weeks[i - 1]
					break;
				}
			}
		}
    this.eventsService.decrement();
	}

}
