import { Component, Input, OnInit } from '@angular/core';
import { CONFIG } from 'src/app/constants/config';
import { IRecipeBlock } from 'src/app/shared/interfaces/i-recipe';
import { SpinnerFunctions } from '../../classes/spinner-functions';
import { RecipesApiService } from '../../services/recipes-api.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {

  @Input() recipe: IRecipeBlock;
  @Input() isProfilePage: boolean;
  imageDir: string = CONFIG.IMAGE_DIR;

  constructor(
    private recipeService: RecipesApiService
  ) { }

  ngOnInit(): void {
  }

  deleteRecipe(id: number){
    SpinnerFunctions.showSpinner();
    this.recipeService.delete(id).subscribe({
      next: data => {
        SpinnerFunctions.hideSpinner();
        location.reload();
      },
      error: err =>{
        console.log(err);
      }
    })
  }

}
