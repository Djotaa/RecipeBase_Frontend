import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CONFIG } from 'src/app/constants/config';
import { IRecipeBlock } from 'src/app/shared/interfaces/i-recipe';
import { SpinnerFunctions } from '../../classes/spinner-functions';
import { RecipesApiService } from '../../services/recipes-api.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class RecipeComponent implements OnInit {

  @Input() recipe: IRecipeBlock;
  @Input() isProfilePage: boolean;
  @Output() deletedRecipe = new EventEmitter<string>();
  imageDir: string = CONFIG.IMAGE_DIR;

  constructor(
    private recipeService: RecipesApiService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
  }

  deleteRecipe(id: number){
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure that you want to delete recipe?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        SpinnerFunctions.showSpinner();
        this.recipeService.delete(id).subscribe({
          next: data => {
            SpinnerFunctions.hideSpinner();
            this.deletedRecipe.emit('deleted');
            setTimeout(() => {
              this.messageService.add({
                severity: 'success',
                summary: 'Deleted',
                detail: 'Recipe deleted',
                life: 3000
              }) 
            });
          },
          error: err =>{
            console.log(err);
            setTimeout(() => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Error deleting recipe. Try again later.',
                life: 3000
              }) 
            });
          }
        })
      }
  });

    
  }

}
