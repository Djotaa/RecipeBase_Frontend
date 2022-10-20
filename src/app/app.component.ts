import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { SpinnerFunctions } from './shared/classes/spinner-functions';

import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private primengConfig: PrimeNGConfig
  ){}

  ngOnInit(){
    this.dynamicChangingTitle();
  }

  dynamicChangingTitle(){
    this.primengConfig.ripple = true;
    const appTitle = this.titleService.getTitle();
    this.router
      .events.pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          let child = this.activatedRoute.firstChild;
          while (child.firstChild) {
            child = child.firstChild;
          }
          if (child.snapshot.data['title']) {
            return child.snapshot.data['title'];
          }
          return appTitle;
        })
      ).subscribe((ttl: string) => {
        if(ttl != "Recipe Base"){
          this.titleService.setTitle("Recipe Base | " + ttl);
        }
        else{
          this.titleService.setTitle("Recipe Base");
        }
      });
  }
}
