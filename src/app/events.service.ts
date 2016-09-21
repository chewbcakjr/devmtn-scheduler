
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable()
export class EventsService {

  constructor(private http:Http, private router:Router) { }
  events:any[] = [];
  base_url:string = 'http://localhost:9001';

  week = [];
  weeks = [];
  count = 0;
  eventsGrouped = [];

  // return a list of events associated with a specified template.
  getEvents(tmpl_id:number):Observable<any> {
    this.weeks = [];


  	return this.http.get(`${this.base_url}/dbevents?tmpl_id=${tmpl_id}`)
  		.map(res => {
                this.events = res.json();
                // console.log(this.events)
                let lastDay = this.events[this.events.length-1].day_number;
                for (let i = 1; i <= lastDay; i++) {
                  // console.log('i',i)
          				let mult = this.events.filter(event => event.day_number == i)
                  // console.log('mult',mult)
          				if (mult.length > 0) {
          					this.eventsGrouped.push(mult)
          				}
          			}
                // console.log(this.eventsGrouped.length)
                // console.log(this.eventsGrouped)
                let maxWeek = Math.ceil(this.eventsGrouped[this.eventsGrouped.length - 1][0].day_number / 7);
                // console.log(maxWeek)
                for (let weekNum = 1; weekNum <= maxWeek; weekNum++) {
                  let temp = this.eventsGrouped.map(day => {
                    return day.filter(event => {
                      return Math.ceil(event.day_number / 7) == weekNum;
                    });
                  });
                  // console.log(temp)
                  this.weeks[weekNum - 1] = temp.filter(item => {
                    return item.length > 0;
                  });
                }
                this.week = this.weeks[this.count];
                // console.log(this.weeks)
                return this.week
              })
  }
  increment() {
    this.count++;
    // console.log(this.count)
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
