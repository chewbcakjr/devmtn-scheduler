import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TemplatesService {

  constructor(private http:Http) { }

  base_url:string = 'http://localhost:9001';

  // this will retrieve a list of the existing templates in the db. templates will be objects with an id and name
  getTmpls():Observable<any> {
  	return this.http.get(`${this.base_url}/templates`)
  		.map(res => res.json())
  }

  // this will create a new template. the id will be auto generated in db
  createTmpl(name:string):Observable<any> {
  	return this.http.post(`${this.base_url}/templates`, {name: name})
  }

}
