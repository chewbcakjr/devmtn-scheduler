import { Component, OnInit } from '@angular/core';
import { GoogleService } from './google.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'DevMountain Scheduler';


  constructor(private googleService:GoogleService,
              private router:Router) { }

  ngOnInit(): void {
  	// this.googleService.getCalendars()
  		// .subscribe(data => console.log(data))
  }

}
