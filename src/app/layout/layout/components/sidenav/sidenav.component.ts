import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { delay, filter } from 'rxjs';
import { links } from 'src/app/constants/links';
import { AuthService } from 'src/app/shared/services/auth.service';

@UntilDestroy()
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit{

  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  menuLinks: any;

  constructor(
    private observer: BreakpointObserver,
    private router: Router,
    public authService: AuthService
  ) { }

  ngOnInit(){
    this.menuLinks = this.authService.token?.Username == "Admin" ? links.admin : links.menu;
  }

  
  

  ngAfterViewInit(){
    this.observer
      .observe(['(max-width: 768px)'])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res:any) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

      this.router.events
      .pipe(
        untilDestroyed(this),
        filter((e:any) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
  }
}
