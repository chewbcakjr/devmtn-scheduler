import { Component, OnInit, OnDestroy } from '@angular/core';
import { GoogleService } from '../google.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  constructor(private googleService:GoogleService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
  	console.log('destroying login component')
  	this.googleService.getCalendars()
  		.subscribe(data => console.log(data))
  }

}
