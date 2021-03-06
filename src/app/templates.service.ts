import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable()
export class TemplatesService {

  constructor(private http:Http, private router:Router) { }

  baseUrl:string = 'http://localhost:9001';
  tmplList:any[] = [];
  currTmpl = {
    template_id: 1,
    name: ''
  };
  week = [];

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
      let exists = this.tmplList.filter(el => el.name == name);
      if (exists.length == 0) {
        return this.http.post(`${this.baseUrl}/templates`, {name: name})
            .map(res => {
              this.currTmpl = res.json()[0];
              console.log(this.currTmpl)
              return res.json()
            })
            .subscribe(res => {
              console.log(res)
              // this will redirect to the create event page. but right now it does it instantly because the functions are running onInit, so I commented it out.
              this.router.navigate(['/event'])
            })
          } else {
            alert('name not available')
          }

  }

  copyTmpl(newName:string, existingTmpl_id:number) {
    console.log('here')
    let obj = {name: newName, template_id:existingTmpl_id};
    if (obj.name && obj.template_id) {
      console.log('good stuff');
      return this.http.put(`${this.baseUrl}/templates`, obj)
        .map(res => {
          console.log(res.json());
          this.currTmpl = res.json();
          console.log(this.currTmpl);
          return res.json()
        })
        .subscribe(res => {
          console.log('copied successfully i hope', res)
          this.router.navigate(['/template', 1])
        })  
    } else {
      alert('There was a problem copying the template.')
    }
  }


}

// createTmpl(name:string):Observable<any> {
//     return this.http.post(`${this.baseUrl}/templates`, {name: name})
//             .map(res => {
//               this.currTmpl = res.json();
//               return res.json()
//             })
//   }
