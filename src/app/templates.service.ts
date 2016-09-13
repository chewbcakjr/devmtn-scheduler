import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TemplatesService {

  constructor(private http:Http) { }

  base_url:string = 'http://localhost:9001';

  getTmpls(): Observable<any> {
  	console.log(this.http.get(`${this.base_url}/templates`))
  	return this.http.get(`${this.base_url}/templates`)
  }

}
