import { Component, OnInit } from '@angular/core';
import { IRecipeGroup } from 'src/app/shared/interfaces/i-recipe-group';
import { RecipeGroupsApiService } from 'src/app/shared/services/recipe-groups-api.service';

@Component({
  selector: 'app-recipe-groups',
  templateUrl: './recipe-groups.component.html',
  styleUrls: ['./recipe-groups.component.scss']
})
export class RecipeGroupsComponent implements OnInit {

  recipeGroups: IRecipeGroup[];
  action: any;

  constructor(
    private recipeGroupService: RecipeGroupsApiService
  ) { 
    if(history.state['action'])
        this.action = history.state['action'];
  }

  ngOnInit(): void {
    this.loadData();
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
        console.log(data)
        this.loadData();
      },
      error: err =>{
        console.log(err);
      }
    })
  }


}
