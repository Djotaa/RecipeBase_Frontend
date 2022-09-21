import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIS } from 'src/app/constants/apis';
import { ApiService } from 'src/app/shared/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService extends ApiService<any>{

  constructor(http: HttpClient) {
    super(http,APIS.FAVORITES);
   }
}
