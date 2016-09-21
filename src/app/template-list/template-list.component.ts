import { Component, OnInit } from '@angular/core';
import { TemplatesService } from '../templates.service';
import { EventsService } from '../events.service';
import { GoLiveService } from '../go-live.service';
import { GoogleService } from '../google.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.scss']
})
export class TemplateListComponent implements OnInit {

  constructor(private templatesService:TemplatesService,
              private eventsService:EventsService, private goLiveService:GoLiveService, private googleService:GoogleService,
              private router:Router) { }

  // these will not stay as strings. just defining them for now to get the front to back working
  tmplList:any[] = [];
  // newTmpl:string = '';

  // this will get the list of templates from the db and load them up and put them onto the data property. this will need to be tweaked probably once there's actually data. maybe not, data would be an object with the template id and template name (program name)
  ngOnInit():void {
    this.eventsService.eventsGrouped = [];
    this.eventsService.count = 0;

  	this.googleService.getCalendars().subscribe(data => console.log(data))
 	// this.eventsService.removeEvent(4)
  	// this.eventsService.getEvents(5)
  	// this.eventsService.updateEvent(1, 'updated', '09:00', '10:00', 'me', 'notes notes', 2)

  	// this.eventsService.createEvent(5,'candice is awesome','now', 'never', 'me', 'nuff said', 1)
  	this.templatesService.getTmpls()
  	// this.templatesService.createTmpl('it works!')

  		.subscribe(data => {
                  this.tmplList = this.templatesService.tmplList;
  			this.tmplList.forEach(tmpl => {
                      if (tmpl.name.toLowerCase().includes('ios')) {
                        tmpl.img = "../assets/courses-ios.png";
                      } else {
                        tmpl.img = "../assets/courses-web.png";
                      }
                  })

                  console.log(this.tmplList);
  			// this.templatesService.createTmpl('mmmmmm')
  			// this.goLiveService.goLive(5,'Provo', new Date())
  				// .subscribe(data => console.log(data))
  			// this.tmplList = data;
  		})
  	// this.eventsService.createEvent(5,'did it work?','now', 'never', 'me', 'nuff said', 1)
  	// 	.subscribe(data => {
  	// 		console.log(data);
  	// 		this.tmplList = data;
  	// 	})
  	// this.goLiveService.goLive(5,'Provo', '2016-09-14T09:00:00')

  }

    chooseTmpl(tmpl) {
      this.templatesService.currTmpl = tmpl;
      this.router.navigate(['template',1])
    }



  // this needs to live somewhere else, but i don't know where yet. and it needs to actually do something besides log the data
  createEvent(tmpl_id:number, name:string, start_time:string, end_time:string, default_instructor:string, notes:string, day_number:number) {
  	this.eventsService.createEvent(tmpl_id, name, start_time, end_time, default_instructor, notes, day_number)
  		.subscribe(data => {
  			console.log(data);
  		})
  }

  // this also will live somewhere else
  removeEvent(event_id:number) {
  	this.eventsService.removeEvent(event_id)
  }



}
