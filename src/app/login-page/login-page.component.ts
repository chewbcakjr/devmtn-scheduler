import { Component, OnInit } from '@angular/core';
import { GoogleService } from '../google.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(private googleService:GoogleService) { }

  ngOnInit() {
  }


}
