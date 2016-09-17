import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/pluck';
// import 'rxjs/Rx';

@Injectable()
export class GoogleService {

  constructor(private http:Http) { }

  base_url:string = 'http://localhost:9001';
  // calendars:any[] = [];
  calendars = {};
  
getCalendars():Observable<any> {
  	return this.http.get(`${this.base_url}/calendars`)
  		.map(res => {
  			this.calendars = res.json().map(function(obj) {
                     return {id: obj.id, name: obj.summary, timeZone: obj.timeZone}   
                  });
                  console.log(this.calendars)
  			return this.calendars;
  		})
  		
  }

}