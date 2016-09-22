import { Component, OnInit } from '@angular/core';
import { GoLiveService } from '../go-live.service';
import { TemplatesService } from '../templates.service';
@Component({
  selector: 'app-go-live-input',
  templateUrl: './go-live-input.component.html',
  styleUrls: ['./go-live-input.component.scss']
})
export class GoLiveInputComponent implements OnInit {

  constructor(private goLiveService:GoLiveService, private templatesService:TemplatesService) { }

  ngOnInit() {
  	this.goLiveService.getCalendars()
  	this.goLiveService.getLocations()
  		.subscribe(data => {
  			console.log(data)
  			this.goLiveService.goLive(this.templatesService.currTmpl.template_id,"Dallas", new Date(), 'fake')
  				.subscribe(data => console.log(data))
  		})
  }

}
