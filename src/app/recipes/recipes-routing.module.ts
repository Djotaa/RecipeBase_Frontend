import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { AddRecipeFormComponent } from './recipes/components/add-recipe-form/add-recipe-form.component';
import { RecipeDetailsComponent } from './recipes/components/recipe-details/recipe-details.component';
import { RecipesComponent } from './recipes/recipes.component';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: RecipesComponent
  },
  {
    path: "recipe-form",
    pathMatch: "full",
    component: AddRecipeFormComponent,
    data: {title: "Add Recipe"},
    canActivate: [AuthGuard]
  },
  {
    path: "recipe-form/:id",
    component: AddRecipeFormComponent,
    data: {title: "Edit recipe"},
    canActivate: [AuthGuard]

  },
  {
    path: ":id",
    component: RecipeDetailsComponent,
    data: {title: "Recipe"}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class RecipesRoutingModule { }
