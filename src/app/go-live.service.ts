import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { EventsService } from './events.service';
import { GoogleService } from './google.service';

@Injectable()
export class GoLiveService {

  constructor(private http:Http, private eventsService:EventsService, private googleService:GoogleService) { }

  baseUrl:string = 'http://localhost:9001';
  locations:any[] = [];
  calendars:any[] = [];        

  getLocations():Observable<any> {
    return this.http.get(`${this.baseUrl}/locations`)
    .map(res => {
        this.locations = res.json();
        return res.json()
      })
  }

  getCalendars():void {
    this.calendars = this.googleService.calendars;
    console.log(this.calendars)
  }

  // when this is invoked, the template Jeremy was on will go live. he will be prompted for what calendar to post it in (and I think we can use this for the Location (provo, SLC, dallas) as well as to grab the address from the db to slap on the api call). He will also be prompted for a start date. 

    goLive(tmpl_id:number, location:string, start_date, calendar:string) {
  	// get the events stored in the service
  	let events = this.eventsService.events;
      // get the address for the chosen location
      let address = this.locations.filter(el => el.location_id === location)[0].address;
      let calendarProps = this.calendars.filter(el => el.name === calendar)[0];

      // copy of the start date so that changing temp doesn't change start_date
  	let temp = new Date(start_date);

	events.map(function(el) {
          // attach address onto event
          el.location = address;
          // adding the day # to the start date so that each event will have the appropriate date in the calendar
          temp.setDate(start_date.getDate() + el.day_number - 1);
          let date = temp.toJSON().split('T')[0];
          el.start_time = `${date}T${el.start_time}`;

          // this is the correct logic for when we're ready for Jeremy to use it. but so everyone can test, I have hard coded these things for now.
          // el.calendarId = calendarProps.id;
          // el.timeZone = calendarProps.timeZone;
          el.calendarId = 'primary';
          el.timeZone = 'UTC';

	  	// need to add calendar id
	  		// need to add attendees
	  		// need to add calendar timeZone
	})
	console.log(events);
      return events;
  }

}
