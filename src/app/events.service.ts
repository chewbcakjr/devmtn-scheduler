
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { TemplatesService } from './templates.service';

@Injectable()
export class EventsService {

  constructor(private http:Http, private router:Router, private templatesService:TemplatesService) { }
  events:any[] = [];
  base_url:string = 'http://localhost:9001';

  week = [];
  weeks = [];
  count = 0;
  maxWeek = 0;
  currEvent = {
    event_id: null,
    name: null,
      start_time: null,
      end_time: null,
      default_instructor: null,
      notes: null,
      day_number: null
  };

  // return a list of events associated with a specified template.
  getEvents(tmpl_id:number):Observable<any> {
    this.count = 0;

  	return this.http.get(`${this.base_url}/dbevents?tmpl_id=${tmpl_id}`)
  		.map(res => {
                let events = res.json();
                let eventsGrouped = []
                let lastDay = events[events.length-1].day_number;
                for (let i = 1; i <= lastDay; i++) {
                               let mult = events.filter(event => event.day_number == i) 
          				if (mult.length > 0) {
          					eventsGrouped.push(mult)
          				}
          			}
                this.maxWeek = Math.ceil(eventsGrouped[eventsGrouped.length - 1][0].day_number / 7);
                // console.log('maxWeek', this.maxWeek)
                for (let weekNum = 1; weekNum <= this.maxWeek; weekNum++) {
                  let temp = eventsGrouped.map(day => {
                    return day.filter(event => {
                      return Math.ceil(event.day_number / 7) == weekNum;
                    });
                  });
                  this.weeks[weekNum - 1] = temp.filter(item => {
                    return item.length > 0;
                  });
                }
                this.week = this.weeks[this.count];
                return this.week
              })
  }
  increment() {
    this.count++;
    this.week = this.weeks[this.count];
    this.router.navigate(['template',this.count+1])
  }
  decrement() {
    this.count--;
    this.week = this.weeks[this.count];
    this.router.navigate(['template',this.count+1])
  }


  // create new event on given template
  createEvent(tmpl_id:number, name:string, start_time:string, end_time:string, default_instructor:string, notes:string, day_number:number):Observable<any> {

  	var obj = {
  		tmpl_id: tmpl_id,
  		name: name,
  		start_time: start_time,
  		end_time: end_time,
  		default_instructor: default_instructor,
  		notes: notes,
  		day_number: day_number
  	};

  	return this.http.post(`${this.base_url}/dbevents?tmpl_id=${obj.tmpl_id}`, obj)
      .map(res => {
        this.events.push(res.json()[0])
        console.log(this.events)
        return res.json()
      })
  }

  // update an event
  updateEvent(event_id:number, name:string, start_time:string, end_time:string, default_instructor:string, notes:string, day_number:number):Observable<any> {
  	let obj = {
  		name: name,
  		start_time: start_time,
  		end_time: end_time,
  		default_instructor: default_instructor,
  		notes: notes,
  		day_number: day_number
  	};

    
  	return this.http.put(`${this.base_url}/dbevents?event_id=${event_id}`, obj)
  		.map(res => {

              this.getEvents(this.templatesService.currTmpl.template_id).subscribe(data => {
                console.log('get events inside update')
                console.log(data)})
  			console.log('updated!');
  			return res.json()
  		})
  }

  // remove an event
  removeEvent(event_id:number):Observable<any> {
  	return this.http.delete(`${this.base_url}/dbevents?event_id=${event_id}`)
  		.map(res => {
  			console.log('event deleted');
  			return res
  		})
  }


}
