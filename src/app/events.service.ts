
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class EventsService {

  constructor(private http:Http) { }
  events:any[] = [];
  base_url:string = 'http://localhost:9001';

  // return a list of events associated with a specified template.
  getEvents(tmpl_id:number):Observable<any> {
  	return this.http.get(`${this.base_url}/dbevents?tmpl_id=${tmpl_id}`)
  		.map(res => {
                this.getEvents = res.json();
                return res.json()
              })
  }

  // create new event on given template
  createEvent(tmpl_id:number, name:string, start_time:string, end_time:string, default_instructor:string, notes:string, day_number:number):Observable<any> {

  	var obj = {
  		tmpl_id: tmpl_id,
  		name: name,
  		start_time: start_time,
  		end_time: end_time,
  		default_instructor: default_instructor,
  		notes: notes,
  		day_number: day_number
  	};

  	return this.http.post(`${this.base_url}/dbevents?tmpl_id=${obj.tmpl_id}`, obj)
      .map(res => {
        this.events.push(res.json()[0])
        console.log(this.events)
        return res.json()
      })
  }

  // update an event
  updateEvent(event_id:number, name:string, start_time:string, end_time:string, default_instructor:string, notes:string, day_number:number):Observable<any> {
  	let obj = {
  		name: name,
  		start_time: start_time,
  		end_time: end_time,
  		default_instructor: default_instructor,
  		notes: notes,
  		day_number: day_number
  	};
  	return this.http.put(`${this.base_url}/dbevents?event_id=${event_id}`, obj)
  		.map(res => {
  			console.log('updated!');
  			return res.json()
  		})
  }

  // remove an event
  removeEvent(event_id:number):Observable<any> {
  	return this.http.delete(`${this.base_url}/dbevents?event_id=${event_id}`)
  		.map(res => {
  			console.log('event deleted');
  			return res
  		})
  }


}
