import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { MessagesComponent } from './admin/components/messages/messages.component';
import { RecipeGroupsComponent } from './admin/components/recipe-groups/recipe-groups.component';
import { RecipeGroupFormComponent } from './admin/components/recipe-group-form/recipe-group-form.component';


@NgModule({
  declarations: [
    AdminComponent,
    MessagesComponent,
    RecipeGroupsComponent,
    RecipeGroupFormComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class AdminModule { }
