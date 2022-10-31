import { Component, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { SpinnerFunctions } from 'src/app/shared/classes/spinner-functions';
import { IRecipeBlock } from 'src/app/shared/interfaces/i-recipe';
import { IRecipeGroup } from 'src/app/shared/interfaces/i-recipe-group';
import { RecipeGroupsApiService } from 'src/app/shared/services/recipe-groups-api.service';
import { RecipesApiService } from 'src/app/shared/services/recipes-api.service';
import { FilterFormService } from './services/filter-form.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  providers: [MessageService]
})
export class RecipesComponent implements OnInit {

  constructor(
    private recipesApiService: RecipesApiService,
    private recipeGroupApiService: RecipeGroupsApiService,
    public filterFormService: FilterFormService,
    private messageService: MessageService
    ) { 
      if(history.state['action'])
        this.action = history.state['action'];
    }

  recipes: IRecipeBlock[];
  recipeGroups: IRecipeGroup[];
  filteredRecipes: IRecipeBlock[];
  hasAnyFilteredRecipes: boolean;
  p: number = 1;
  isReady: boolean = false;
  action: any;

  ngOnInit(): void {
    SpinnerFunctions.showSpinner();

    forkJoin({
      "recipes": this.recipesApiService.getAll(),
      "recipeGroups": this.recipeGroupApiService.getAll()
    }).subscribe({
      next: (data:any) =>{
        this.recipes = data.recipes;
        this.recipeGroups = data.recipeGroups;
        this.filterFormService.form.setControl("recipeGroup", new UntypedFormArray(data.recipeGroups.map((x:any)=>new UntypedFormControl())));
        this.filterRecipes();

        this.filterFormService.form.valueChanges.subscribe({
          next: () =>  this.filterRecipes()
        })
        setTimeout(()=> this.isReady = true);

        SpinnerFunctions.hideSpinner();
      },
      error: err => {
        SpinnerFunctions.hideSpinner();
        console.log(err)
      }
    })

    if(this.action == 'noAuth'){
      this.action = '';
      setTimeout(() => {
        this.messageService.add({
          severity: 'error',
          summary: 'Not authorized',
          detail: 'You need to be logged in to visit that page.',
          life: 3000
        }) 
      });
    }
    else if(this.action == 'notAdmin'){
      this.action = '';
      setTimeout(() => {
        this.messageService.add({
          severity: 'error',
          summary: 'Not admin',
          detail: 'You need to be the administrator to visit that page.',
          life: 3000
        }) 
      });
    }
    else if(this.action == 'loggedIn'){
      this.action = '';
      setTimeout(() => {
        this.messageService.add({
          severity: 'error',
          summary: 'Already logged in',
          detail: "You can't visit register and login pages when you are logged in.",
          life: 3000
        }) 
      });
    }


    
  }

  filterRecipes(): void{
    this.filteredRecipes = this.recipes;

    let checkedRecipeGroups = this.recipeGroups.filter((el, i) => {
      return this.filterFormService.form.value.recipeGroup[i]
    }).map(x=>x.id);

    let searchValue = this.filterFormService.form.value.keyword.toLowerCase();

    if(searchValue){
      this.filteredRecipes = this.filteredRecipes.filter(x=> x.title.toLowerCase().includes(searchValue))
    }

    if(checkedRecipeGroups.length){
      this.filteredRecipes = this.filteredRecipes.filter(x=> checkedRecipeGroups.includes(x.categoryId))
    }

    let sortValue = this.filterFormService.form.value.sort;
    let direction = sortValue == 'asc' ? 1 : -1;

    this.filteredRecipes.sort((a,b)=>a.createdAt > b.createdAt ? direction : -direction)

    this.hasAnyFilteredRecipes = !!this.filteredRecipes.length;

    this.p = 1;

  }


}
