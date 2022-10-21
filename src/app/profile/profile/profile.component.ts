import { Component, OnInit } from '@angular/core';
import { FavoritesService } from 'src/app/shared/services/favorites.service';
import { IRecipeBlock } from 'src/app/shared/interfaces/i-recipe';
import { forkJoin } from 'rxjs';
import { UserRecipesService } from './services/user-recipes.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SpinnerFunctions } from 'src/app/shared/classes/spinner-functions';
import { MessageService } from 'primeng/api'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [MessageService]
})
export class ProfileComponent implements OnInit {

  favoriteRecipes: IRecipeBlock[];
  usersRecipes: IRecipeBlock[];
  username: string;
  isReady: boolean = false;
  p1: number = 1;
  p2: number = 1;
  hasFavorites: boolean;
  hasRecipes: boolean;
  action: any;

  constructor(
    private favoriteService: FavoritesService,
    private userRecipesService: UserRecipesService,
    private authService: AuthService,
    private messageService: MessageService
    ) {
      if(history.state['action'])
        this.action = history.state['action'];
    }

  ngOnInit(): void {    
    this.username = this.authService.token.Username;

    if(this.action == 'added'){
      this.action = '';
      setTimeout(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Added',
          detail: 'Recipe added',
          life: 3000
        }) 
      });
    }
    else if(this.action =='edited'){
      this.action = '';
      setTimeout(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Updated',
          detail: 'Recipe updated',
          life: 3000
        }) 
      });
    }
    this.loadData();
  }

  loadData(): void{
    SpinnerFunctions.showSpinner();
    forkJoin({
      "favorites": this.favoriteService.getAll(),
      "usersRecipes": this.userRecipesService.getAll()
    }).subscribe({
      next: (data:any) => {
        this.favoriteRecipes = data.favorites;
        this.usersRecipes = data.usersRecipes;
        this.hasFavorites = !!this.favoriteRecipes.length;
        this.hasRecipes = !!this.usersRecipes.length;

        setTimeout(()=>this.isReady=true);
        SpinnerFunctions.hideSpinner();
      },
      error: (err:any) =>{
        SpinnerFunctions.hideSpinner();
        console.log(err);
      }
    });
  }

  recipeDeleted(event: any){
    this.loadData();
    setTimeout(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Deleted',
        detail: 'Recipe deleted',
        life: 3000
      }) 
    });
  }
  
}
