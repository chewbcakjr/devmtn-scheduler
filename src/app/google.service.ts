import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GoogleService {

  constructor(private http:Http) { }

  base_url:string = 'http://localhost:9001';
  logged_in:boolean = false;

  getCalendars():Observable<any> {
  	
  	return this.http.get(`${this.base_url}/auth/me`)
  		.map(res => {
  			if (!res.json().credentials.access_token) {
  			// above if statement used just in development. below statement used once we build/bundle and serve our files with express/node
  			// if (!res.json().user) {	
  				window.location.href='http://localhost:9001/auth/google'
  			}
  		})
  }
}


