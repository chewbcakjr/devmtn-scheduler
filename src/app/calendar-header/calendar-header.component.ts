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
	
	calendars;
	
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
				// $('select').material_select();
				$('#location').material_select();
				$('#calendar').material_select();
	}




	currTmpl = {};
	currWeek:number = 1;
	locations:any[] = [];

	ngOnInit() {
		this.currTmpl = this.templatesService.currTmpl;
		this.route.params.forEach((params: Params) => {
      		this.currWeek = +params['weeknum'];
    		})

		this.calendars = this.goLiveService.getCalendars();
		this.goLiveService.getLocations()
			.subscribe(data => {
				this.locations = data;
				console.log(this.locations)
			})
	}

	nextWeek() {
    		this.eventsService.increment();
	}
	
	lastWeek() {
		this.eventsService.count = this.currWeek - 1;
		console.log(this.eventsService.count)
	    this.eventsService.decrement();
	}

	goLive(location:string, startDate, calendar:string) {
		console.log(arguments)
		console.log(typeof(startDate))
		this.goLiveService.goLive(this.currTmpl.template_id, location, startDate, calendar)
		.subscribe(data => {
			console.log(data);
		})
	}

}
