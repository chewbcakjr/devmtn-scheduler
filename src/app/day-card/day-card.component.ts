// import { Component, OnInit } from '@angular/core';
import {Component, OnInit, AfterViewInit, Input} from '@angular/core';
import { EventsService } from '../events.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TemplatesService } from '../templates.service';


declare var $:any;

@Component({
  selector: 'app-day-card',
  templateUrl: './day-card.component.html',
  styleUrls: ['./day-card.component.scss']
})
export class DayCardComponent implements OnInit {
//  @ViewChild('selectElem') el:ElementRef;
currentEvent: any;

  @Input() event = [];
	events = [];
	event_id;
	name: string;
	start_time: string;
	end_time: string;
	default_instructor: string;
	notes: string;
	day_number: number;

  ngAfterViewInit() {
        $('.modal-trigger').leanModal();
    }

    clickConsole() {
      console.log('hoo yeeaa');
    }

  constructor(private eventsService: EventsService, private route: ActivatedRoute, public router: Router, private templatesService: TemplatesService) { }

  ngOnInit() {
// 	// 	var eventId  = 	this.route.params.subscribe(params => {
// 	// 	 var eventId = +params['id'];
// 	// 	 this.eventsService.getEventId(eventId)
// 	// 	 .subscribe(data => {
//   //      console.log(data);s
//   //    })
//   // })
// 	// var eventId  = 	this.route.params.subscribe(params => {
// 	// let id = Number.parseInt(params['id']);
// 	// //  console.log('here is the event' + id);
// 	//  var currentEvent = this.eventsService.getEventId(id);
// 	//  console.log(this.currentEvent);
// });
var eventId  = 	this.route.params.subscribe(params => {
 var eventId = +params['id'];
 this.eventsService.getEventId(eventId)
 .subscribe(data => {
	 console.log(data);
 })
})
}
	// updateEvent() {
	// // 	var eventId  = 	this.route.params.subscribe(params => {
	// // 	var id = Number.parseInt(params['id']);
	// // 	 console.log('here is the event' + id);
	// // 	 this.currentEvent = this.eventsService.getEventId(id);
	// //  });
	// 		var eventId  = 	this.route.params.subscribe(params => {
	// 		 var eventId = +params['id'];
	// 		 this.eventsService.getEventId(eventId)
	// 		 .subscribe(data => {
	//        console.log(data);
	//      })
	//   })
	// 	 this.eventsService.updateEvent(this.currentEvent,'updating event?', 'yesterday', 'today', 'me','notes here',2)
	// 	 .subscribe(data => {
	// 		 console.log(data);
	// 	 });
	// 	// this.eventsService.updateEvent(1,'updating event?', 'yesterday', 'today', 'me','notes here',2)
	// 	// .subscribe(() => {
	// 	// 	console.log('redirect will happen here')
	// 	// 	// here's the logic to redirect. when we move it out of ngOnInit, uncomment this.
	// 	// 	this.router.navigate(['/editEvent'])
	// 	// })
	// 	this.router.navigate(['editEvent']);
	// }
	updateEvent() {
		this.eventsService.getEventId(this.event_id).subscribe(data => {
			for (let i = 1; i <= data.length; i++) {
				let mult = data.filter(event => event.day_number == i)
				if (mult.length > 0) {
					this.events.push(mult)
				}
			}
			console.log('data', this.events)
		})
		this.eventsService.updateEvent(this.event_id, this.name, this.start_time, this.end_time, this.default_instructor, this.notes, this.day_number);
	}

	goToEditEvent() {
		var event_id = this.eventsService.getEventId(this.templatesService.currTmpl.template_id);
		this.router.navigate(['editEvent', event_id]);
		console.log(event_id);
	}

	goToSpecificCreateEvent() {
		this.router.navigate(['editEvent']);
	}

}
