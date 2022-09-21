import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CONFIG } from 'src/app/constants/config';

@Injectable({
  providedIn: 'root'
})
export abstract class ApiService<T> {

  url: string;

  constructor(
    protected http: HttpClient,
    @Inject("path") protected path: string
  ) {

    this.updateUrl();

  }
  
  updateUrl(): void {
    this.url = (this.path.endsWith(".json") ? CONFIG.LOCAL : CONFIG.SERVER) + this.path;
  }

  getHeaders(): any {
    let token = localStorage.getItem("token");

    if(token)
      return {
        Authorization: "Bearer " + localStorage.getItem("token")
      };
    
    return {};
  }

  getAll(): Observable<T[]> {
    if(this.url.endsWith(".json")){
      return this.http.get<T[]>(this.url);
    }
    return this.http.get<any>(this.url + "?perPage=9999", {headers: this.getHeaders()}).pipe(map(x => x.items));
  }

  get(id: number | string): Observable<T> {
    if (this.url.endsWith(".json")) {
      return this.getAll().pipe(map((x: T[]) => x.find((el: any) => el.id == id)));
    }
    return this.http.get<T>(this.url + "/" + id, {headers: this.getHeaders()});
  }

  create(dataToSend: any): Observable<any> {
    return this.http.post<T>(this.url, dataToSend, {headers: this.getHeaders()});
  }

  update(id: number | string, dataToSend: any): Observable<any> {
    return this.http.put<T>(this.url + "/" + id, dataToSend, {headers: this.getHeaders()});
  }

  delete(id: number | string): Observable<any> {
    return this.http.delete<T>(this.url + "/" + id, {headers: this.getHeaders()});
  }

}
