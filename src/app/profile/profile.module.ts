import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { UpdateProfileFormComponent } from './profile/components/update-profile-form/update-profile-form.component';



@NgModule({
  declarations: [
    ProfileComponent,
    UpdateProfileFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    RouterModule
  ]
})
export class ProfileModule { }
