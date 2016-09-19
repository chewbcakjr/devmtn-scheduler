import { Component, OnInit, AfterViewInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-schedule-header',
  templateUrl: './schedule-header.component.html',
  styleUrls: ['./schedule-header.component.scss']
})
export class ScheduleHeader {

  constructor() { }

  ngAfterViewInit() {
        $('.modal-trigger').leanModal();
    }

  onSubmit(template) {
    console.log(template);
  }

}
