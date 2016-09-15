import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import {Event} from './event/event';

@Injectable()
export class EventsService {

	tmpl_id: number;
	name: string;
	start_time: string;
	end_time: string;
	default_instructor: string;
	notes: string;
	day_number: number;



  constructor(private http:Http) { }

  base_url:string = 'http://localhost:9001';


  // return a list of events associated with a specified template.

  // getEvents(tmpl_id:number):Observable<any> {
  // 	return this.http.get(`${this.base_url}/dbevents?tmpl_id=${tmpl_id}`)
  // 		.map(res => res.json())
  // }


  // createEvent(tmpl_id:number, name:string, start_time:string, end_time:string, default_instructor:string, notes:string, day_number:number):Observable<any> {
	// createEvent(event) : Observable<Event[]>{
  // 	var obj = {
  // 		tmpl_id: this.tmpl_id,
  // 		name: this.name,
  // 		start_time: this.start_time,
  // 		end_time: this.end_time,
  // 		default_instructor: this.default_instructor,
  // 		notes: this.notes,
  // 		day_number: this.day_number
  // 	};
	//
  // 	// return this.http.post(`${this.base_url}/dbevents?tmpl_id=${obj.tmpl_id}`, obj)
	// 		return this.http.post(`${this.base_url}/dbevents?tmpl_id=${obj.tmpl_id}`, obj)
	// 	.map(res => res.json())
	// 	.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	// }
	// updateEvent(event) {
	// 	return this.http.put(`${this.base_url}/dbevents?tmpl_id=${event.tmpl_id}`, event)
	// 	.map(res => res.json());
	// }

	  createEvent():Observable<Event[]> {
	  	var obj = {
	  		tmpl_id: this.tmpl_id,
	  		name: this.name,
	  		start_time: this.start_time,
	  		end_time: this.end_time,
	  		default_instructor: this.default_instructor,
	  		notes: this.notes,
	  		day_number: this.day_number
	  	};

	  	return this.http.post(`${this.base_url}/dbevents?tmpl_id=${this.tmpl_id}`,obj)
			.map((res:Response)=> res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
			// .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	  }
	// getEvents(tmpl_id:number):Observable<any> {
	// 	return this.http.get(`${this.base_url}/dbevents?tmpl_id=${tmpl_id}`)
	// 		.map(res => res.json())
	// }

	// getEvents(tmpl_id:number):Observable<Event> {
  // 	return this.http.get(`${this.base_url}/dbevents?tmpl_id=${tmpl_id}`)
  // 		.map(res => res.json())
	// 		.catch(this.handleError)
  // }
	getEvents():Observable<Event> {
		return this.http.get(`${this.base_url}/dbevents`)
			.map(res => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}

  // createEvent(tmpl_id:number, name:string, start_time:string, end_time:string, default_instructor:string, notes:string, day_number:number):Observable<any> {
  // 	var obj = {
  // 		tmpl_id: tmpl_id,
  // 		name: name,
  // 		start_time: start_time,
  // 		end_time: end_time,
  // 		default_instructor: default_instructor,
  // 		notes: notes,
  // 		day_number: day_number
  // 	};
	//
  // 	return this.http.post(`${this.base_url}/dbevents?tmpl_id=${obj.tmpl_id}`, obj)
  // }
	// this could also be a private method of the component class
	handleError(error: any) {
	  // log error
	  // could be something more sofisticated
	  let errorMsg = error.message || `Yikes! There was was a problem with our hyperdrive device and we couldn't retrieve your data!`
	  console.error(errorMsg);

	  // throw an application level error
	  return Observable.throw(errorMsg);
	}

}
