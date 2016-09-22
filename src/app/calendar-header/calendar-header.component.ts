import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TemplatesService } from '../templates.service';
import { EventsService } from '../events.service';
import { ActivatedRoute, Params } from  '@angular/router';
import { GoLiveService } from '../go-live.service';

declare var $:any;

@Component({
	selector: 'app-calendar-header',
	templateUrl: './calendar-header.component.html',
	styleUrls: ['./calendar-header.component.scss']
})
export class CalendarHeader implements OnInit {

	constructor(private goLiveService: GoLiveService, private templatesService: TemplatesService, private eventsService: EventsService, private route:ActivatedRoute) { }
	goLiveCalendar;
	//trigger the go-live modal
	ngAfterViewInit() {

				//modal
				$('.modal-trigger').leanModal();

				//datepicker
				$('.datepicker').pickadate({
			    selectMonths: true, // Creates a dropdown to control month
			    selectYears: 15 // Creates a dropdown of 15 years to control year
			  });

				//<select>
				$('select').material_select();
	}


	currTmpl = {};

	// weeks = [
	// 	'ONE',
	// 	'TWO',
	// 	'THREE',
	// 	'FOUR',
	// 	'FIVE',
	// 	'SIX',
	// 	'SEVEN',
	// 	'EIGHT',
	// 	'NINE',
	// 	'TEN',
	// 	'ELEVEN',
	// 	'TWELVE',
	// 	'THIRTEEN',
	// 	'FOURTEEN',
	// 	'FIFTEEN',
	// 	'SIXTEEN'
	// ];


	// currWeek = this.weeks[0];
	currWeek:number = 1;
	// maxWeek:number = 1;

	ngOnInit() {
		this.currTmpl = this.templatesService.currTmpl;
		this.route.params.forEach((params: Params) => {
      		this.currWeek = +params['weeknum'];
    		})
		// this.maxWeek = this.eventsService.maxWeek;
		console.log(this.currWeek)
		// console.log(this.maxWeek)

		this.goLiveCalendar = this.goLiveService.getCalendars()
	}

	nextWeek() {
		// console.log('nextWeek')
		// for (var i = 0; i <= this.weeks.length; i++) {
		// 	if (this.weeks[i] === this.currWeek) {
		// 		if (this.currWeek === this.weeks[0] + (this.weeks.length - 1)) {
		// 			this.currWeek = this.weeks[0] + this.weeks.length;
		// 		} else {
		// 			this.currWeek = this.weeks[i + 1]
		// 			break;
		// 		}
		// 	}
		// }
		console.log(this.goLiveCalendar)

    this.eventsService.increment();

	}
	lastWeek() {
		// console.log('lastWeek')
		// for (var i = 0; i <= this.weeks.length; i++) {
		// 	if (this.weeks[i] === this.currWeek) {
		// 		if (this.currWeek === this.weeks[0]) {
		// 			this.currWeek = this.weeks[0]
		// 		} else {
		// 			this.currWeek = this.weeks[i - 1]
		// 			break;
		// 		}
		// 	}
		// }
    this.eventsService.decrement();
	}

}
