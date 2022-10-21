import { Component, OnInit } from '@angular/core';
import { IRecipeGroup } from 'src/app/shared/interfaces/i-recipe-group';
import { RecipeGroupsApiService } from 'src/app/shared/services/recipe-groups-api.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-recipe-groups',
  templateUrl: './recipe-groups.component.html',
  styleUrls: ['./recipe-groups.component.scss'],
  providers: [MessageService]
})
export class RecipeGroupsComponent implements OnInit {

  recipeGroups: IRecipeGroup[];
  action: any;

  constructor(
    private recipeGroupService: RecipeGroupsApiService,
    private messageService: MessageService
  ) { 
    if(history.state['action'])
        this.action = history.state['action'];
  }

  ngOnInit(): void {
    this.loadData();

    if(this.action == 'added'){
      this.action = '';
      setTimeout(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Added',
          detail: 'Recipe group added',
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
          detail: 'Recipe group updated',
          life: 3000
        }) 
      });
    }

  }

  loadData(): void{
    this.recipeGroupService.getAll().subscribe({
      next: data =>{
        this.recipeGroups = data;
      }
    })
  }

  deleteGroup(id: number | string): void{
    this.recipeGroupService.delete(id).subscribe({
      next: data =>{
        this.loadData();
        setTimeout(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Deleted',
            detail: 'Recipe group deleted',
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
            detail: 'Error deleting recipe group. Try again later.',
            life: 3000
          }) 
        });
      }
    })
  }


}
