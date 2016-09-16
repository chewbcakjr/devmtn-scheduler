import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TemplatesService {

  constructor(private http:Http) { }

  baseUrl:string = 'http://localhost:9001';
  tmplList:any[] = [];
  currTmpl = {
    template_id: 1,
    name: ''
  };

  // this will retrieve a list of the existing templates in the db. templates will be objects with an id and name
  getTmpls():Observable<any> {
  	return this.http.get(`${this.baseUrl}/templates`)
  		.map(res => {
                this.tmplList = res.json();
                return res.json()
              })
  }

  // this will create a new template. the id will be auto generated in db
  createTmpl(name:string) {
    console.log('got here')
      let exists = this.tmplList.filter(el => el.name == name);
      // if (exists.length == 0) {
        return this.http.post(`${this.baseUrl}/templates`, {name: name})
            .map(res => {
              console.log('base test', this.baseUrl);
              this.currTmpl = res.json()[0];
              console.log(this.currTmpl)
              return res.json()
            })
            .subscribe(res => {
              console.log(res)
              // this.currTmpl = res.json()[0]
              return res;
              // console.log(this.currTmpl)
              // console.log('set currTmpl');
            })
          // } else {
          //   alert('name not available')
          // }

  }


}

// createTmpl(name:string):Observable<any> {
//     return this.http.post(`${this.baseUrl}/templates`, {name: name})
//             .map(res => {
//               this.currTmpl = res.json();
//               return res.json()
//             })
//   }
