import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CONFIG } from 'src/app/constants/config';
import { SpinnerFunctions } from 'src/app/shared/classes/spinner-functions';
import { IRecipe } from 'src/app/shared/interfaces/i-recipe';
import { AuthService } from 'src/app/shared/services/auth.service';
import { RecipesApiService } from 'src/app/shared/services/recipes-api.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {

  recipe: IRecipe;
  isReady: boolean = false;
  isLoggedIn: boolean;
  imageDir: string = CONFIG.IMAGE_DIR;

  constructor(
    private recipeApiService: RecipesApiService,
    private activatedRoute: ActivatedRoute,
    private title: Title,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = !!localStorage.getItem("token");
    console.log(this.isLoggedIn)
    SpinnerFunctions.showSpinner();

    let id = this.activatedRoute.snapshot.params["id"];

    this.recipeApiService.get(id).subscribe({
      next: data => {
        this.recipe=data;
        SpinnerFunctions.hideSpinner();

        if(!this.recipe){
          this.router.navigateByUrl("/404");
          return;
        }

        this.title.setTitle(this.title.getTitle().replace("Recipe", this.recipe.title));
        
        this.isReady = true;
      },
      error: err => {
        console.log(err)
        if(err.status == 404){
          SpinnerFunctions.hideSpinner();
          this.router.navigateByUrl("/404");
        }
      }
    });
  }

}
