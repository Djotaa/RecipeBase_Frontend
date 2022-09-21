import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIS } from 'src/app/constants/apis';
import { IRecipe } from 'src/app/shared/interfaces/i-recipe';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesApiService extends ApiService<IRecipe>{

  constructor(http: HttpClient) {
    super(http,APIS.RECIPES);
   }
}
