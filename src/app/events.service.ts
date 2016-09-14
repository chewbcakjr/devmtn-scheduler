import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class EventsService {

  constructor(private http:Http) { }

  base_url:string = 'http://localhost:9001';

  // return a list of events associated with a specified template. 
  getEvents(tmpl_id:number):Observable<any> {
  	return this.http.get(`${this.base_url}/dbevents?tmpl_id=${tmpl_id}`)
  		.map(res => res.json())
  }

  createEvent(obj):Observable<any> {
  	return this.http.post(`${this.base_url}/dbevents?tmpl_id=${obj.tmpl_id}`, obj)
  }


}
