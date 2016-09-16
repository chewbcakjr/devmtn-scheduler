import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/pluck';

@Injectable()
export class GoogleService {

  constructor(private http:Http) { }

  base_url:string = 'http://localhost:9001';
  calendars:any[] = [];
  
getCalendars():Observable<any> {
  	return this.http.get(`${this.base_url}/calendars`)
  		.map(res => {
  			this.calendars = res.json()
  			return res.json()
  		})
  		
  }

}