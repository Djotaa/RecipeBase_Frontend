import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './components/spinner/spinner/spinner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { RecipeComponent } from './components/recipe/recipe.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    SpinnerComponent,
    RecipeComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    HttpClientModule,
    SpinnerComponent,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    RecipeComponent
  ]
})
export class SharedModule { }
