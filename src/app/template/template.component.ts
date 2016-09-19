import { Component, OnInit } from '@angular/core';
import { TemplatesService } from '../templates.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {

  constructor(private templatesService:TemplatesService) { }

  ngOnInit() {
  	console.log(this.templatesService.currTmpl)
  }

}
