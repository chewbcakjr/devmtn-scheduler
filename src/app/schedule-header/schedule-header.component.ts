import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TemplatesService } from '../templates.service';

declare var $:any;

@Component({
  selector: 'app-schedule-header',
  templateUrl: './schedule-header.component.html',
  styleUrls: ['./schedule-header.component.scss']
})
export class ScheduleHeader {

  constructor(private templatesService:TemplatesService) { }

  ngAfterViewInit() {
    $('#timepicker').pickatime({
      autoclose: false,
      twelvehour: false
    });
  }

  // onSubmit(template) {
  //   console.log('calvin + hobbes');
  //   console.log(template);
  // }

  // this should be invoked when Jeremy selects "create a new template" and then hits save
  // should it also push to the tmplList so as to not do another db call? would that cause issues with anything?
  createTmpl(name:string) {
    console.log(name)
    this.templatesService.createTmpl(name)
      // .subscribe(data => {
        // console.log(data);
        // this.newTmpl = data;
      // })
  }

}
