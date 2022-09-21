import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessagesComponent } from './admin/components/messages/messages.component';
import { RecipeGroupFormComponent } from './admin/components/recipe-group-form/recipe-group-form.component';
import { RecipeGroupsComponent } from './admin/components/recipe-groups/recipe-groups.component';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "messages"
  },
  {
    path: "messages",
    component: MessagesComponent,
    data: {title: "Messages"}
  },
  {
    path: "recipe-groups",
    component: RecipeGroupsComponent,
    data: {title: "Recipe groups"}
  },
  {
    path: "recipe-group-form",
    pathMatch: "full",
    component: RecipeGroupFormComponent,
    data: {title: "Add Recipe Group"}
  },
  {
    path: "recipe-group-form/:id",
    component: RecipeGroupFormComponent,
    data: {title: "Edit Recipe Group"}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
