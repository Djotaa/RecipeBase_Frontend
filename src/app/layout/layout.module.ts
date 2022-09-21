import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { SidenavComponent } from './layout/components/sidenav/sidenav.component';
import { FooterComponent } from './layout/components/footer/footer.component';
import { MaterialModule } from '../material/material.module';
import { NotFoundComponent } from './layout/components/not-found/not-found/not-found.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    LayoutComponent,
    SidenavComponent,
    FooterComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class LayoutModule { }
