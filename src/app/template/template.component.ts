import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {

  constructor() { }

  ngOnInit() :void {
	    this.route.params.forEach((params: Params) => {
	      let id = +params['id'];
	      this.heroService.getHero(id)
	        .then(hero => this.hero = hero);
	    });
	  }
}

  }

}
