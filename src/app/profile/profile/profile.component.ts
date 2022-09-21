import { Component, OnInit } from '@angular/core';
import { FavoritesService } from 'src/app/shared/services/favorites.service';
import { IRecipeBlock } from 'src/app/shared/interfaces/i-recipe';
import { forkJoin } from 'rxjs';
import { UserRecipesService } from './services/user-recipes.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SpinnerFunctions } from 'src/app/shared/classes/spinner-functions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  favoriteRecipes: IRecipeBlock[];
  usersRecipes: IRecipeBlock[];
  username: string;
  isReady: boolean = false;
  p: number = 1;
  hasFavorites: boolean;
  hasRecipes: boolean;
  action: any;

  constructor(
    private favoriteService: FavoritesService,
    private userRecipesService: UserRecipesService,
    private authService: AuthService
    ) {
      if(history.state['action'])
        this.action = history.state['action'];
    }

  ngOnInit(): void {
    this.username = this.authService.token.Username;
    this.loadData();
  }

  loadData(): void{
    SpinnerFunctions.showSpinner();
    forkJoin({
      "favorites": this.favoriteService.getAll(),
      "usersRecipes": this.userRecipesService.getAll()
    }).subscribe({
      next: data => {
        this.favoriteRecipes = data.favorites;
        this.usersRecipes = data.usersRecipes;
        this.hasFavorites = !!this.favoriteRecipes.length;
        this.hasRecipes = !!this.usersRecipes.length;

        setTimeout(()=>this.isReady=true);
        SpinnerFunctions.hideSpinner();
      },
      error: err =>{
        SpinnerFunctions.hideSpinner();
        console.log(err);
      }
    });
  }
  
}
