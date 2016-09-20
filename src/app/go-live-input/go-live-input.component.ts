import { Component, OnInit } from '@angular/core';
import { GoLiveService } from '../go-live.service';
@Component({
  selector: 'app-go-live-input',
  templateUrl: './go-live-input.component.html',
  styleUrls: ['./go-live-input.component.scss']
})
export class GoLiveInputComponent implements OnInit {

  constructor(private goLiveService:GoLiveService) { }

  ngOnInit() {
  	this.goLiveService.getCalendars()
  	this.goLiveService.getLocations()
  		.subscribe(data => {
  			console.log(data)
  			this.goLiveService.goLive(1,"Dallas", new Date(), 'NewTestCal6')
  				.subscribe(data => console.log(data))
  		})
  }

}
