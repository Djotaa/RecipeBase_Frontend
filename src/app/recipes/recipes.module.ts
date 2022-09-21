import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipeDetailsComponent } from './recipes/components/recipe-details/recipe-details.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { RecipesComponent } from './recipes/recipes.component';
import { FavoriteButtonComponent } from './recipes/components/favorite-button/favorite-button.component';
import { AddRecipeFormComponent } from './recipes/components/add-recipe-form/add-recipe-form.component';


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
    SharedModule
  ]
})
export class RecipesModule { }
