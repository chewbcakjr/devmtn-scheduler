import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { EventsService } from './events.service';

@Injectable()
export class GoLiveService {

  constructor(private http:Http, private eventsService:EventsService) { }

  base_url:string = 'http://localhost:9001';
  // when this is invoked, the template Jeremy was on will go live. he will be prompted for what calendar to post it in (and I think we can use this for the Location (provo, SLC, dallas) as well as to grab the address from the db to slap on the api call). He will also be prompted for a start date. 

    goLive(tmpl_id:number, location:string, start_date):Observable<any> {
  	// get the events stored in the service
  	let events = this.eventsService.events;
  	let temp = new Date(start_date);

  	return this.http.get(`${this.base_url}/locations?location=${location}`)
  		.map(res =>{
  			console.log(res.json());
  			let address = res.json().address;
  			console.log(this.address)
  			// ---------------
  			events.map(function(el) {
  		// right now this just slaps on a string, but we need to fetch the address from the db based on the location that jeremy chooses
	  			
	  			el.location = address
	  		
		  		temp.setDate(start_date.getDate() + el.day_number - 1)
		  		let date = temp.toJSON().split('T')[0];
		  		el.start_time = `${date}T${el.start_time}`;

	  		// need to add calendar id
	  		// need to add attendees
	  		// need to add calendar timeZone
	  			})
	  		console.log(events);
	  		// ---------------

  			return res.json();
  		})
  	
  }

}
