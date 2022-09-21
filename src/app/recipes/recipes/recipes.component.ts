import { Component, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormControl } from '@angular/forms';
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
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {

  constructor(
    private recipesApiService: RecipesApiService,
    private recipeGroupApiService: RecipeGroupsApiService,
    public filterFormService: FilterFormService
    ) { }

  recipes: IRecipeBlock[];
  recipeGroups: IRecipeGroup[];
  filteredRecipes: IRecipeBlock[];
  hasAnyFilteredRecipes: boolean;
  p: number = 1;
  isReady: boolean = false;

  ngOnInit(): void {
    SpinnerFunctions.showSpinner();

    forkJoin({
      "recipes": this.recipesApiService.getAll(),
      "recipeGroups": this.recipeGroupApiService.getAll()
    }).subscribe({
      next: data =>{
        this.recipes = data.recipes;
        this.recipeGroups = data.recipeGroups;
        this.filterFormService.form.setControl("recipeGroup", new UntypedFormArray(data.recipeGroups.map(x=>new UntypedFormControl())));
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
