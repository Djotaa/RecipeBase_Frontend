import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipeDetailsComponent } from './recipes/components/recipe-details/recipe-details.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { RecipesComponent } from './recipes/recipes.component';
import { FavoriteButtonComponent } from './recipes/components/favorite-button/favorite-button.component';
import { AddRecipeFormComponent } from './recipes/components/add-recipe-form/add-recipe-form.component';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import {InputTextModule} from 'primeng/inputtext';
import {DialogModule} from 'primeng/dialog';
import {InputNumberModule} from 'primeng/inputnumber';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { RippleModule } from 'primeng/ripple';


@NgModule({
  declarations: [
    RecipesComponent,
    RecipeDetailsComponent,
    FavoriteButtonComponent,
    AddRecipeFormComponent
  ],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    MaterialModule,
    SharedModule,
    TableModule,
    ButtonModule,
    ToastModule,
    ToolbarModule,
    InputTextModule,
    DialogModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    RippleModule
  ]
})
export class RecipesModule { }
