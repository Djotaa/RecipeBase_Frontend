import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIS } from 'src/app/constants/apis';
import { IRecipeGroup } from '../interfaces/i-recipe-group';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeGroupsApiService extends ApiService<IRecipeGroup>{

  constructor(http: HttpClient) {
    super(http, APIS.RECIPE_GROUPS)
  }
}
