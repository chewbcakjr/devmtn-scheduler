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
  	if (!this.logged_in) {
	  	return this.http.get(`${this.base_url}/auth/me`)
	  		.map(res => {
	  			console.log(res)
	  			this.logged_in = true
	  		     
	  		     	window.location.href='http://localhost:9001/auth/google'
	  		    
  		})
  	}
  }
}


