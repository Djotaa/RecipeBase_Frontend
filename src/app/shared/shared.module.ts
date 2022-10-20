import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './components/spinner/spinner/spinner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { RecipeComponent } from './components/recipe/recipe.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import {InputTextModule} from 'primeng/inputtext';
import {DialogModule} from 'primeng/dialog';
import {InputNumberModule} from 'primeng/inputnumber';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {InputTextareaModule} from 'primeng/inputtextarea';



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
    MaterialModule,
    TableModule,
    ButtonModule,
    ToastModule,
    ToolbarModule,
    InputTextModule,
    DialogModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule
  ],
  exports: [
    HttpClientModule,
    SpinnerComponent,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    RecipeComponent,
    TableModule,
    ButtonModule,
    ToastModule,
    ToolbarModule,
    InputTextModule,
    DialogModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule
  ]
})
export class SharedModule { }
