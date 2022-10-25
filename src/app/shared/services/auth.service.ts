import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: any;
  isLoggedIn: boolean = false;

  constructor(private router: Router) { 

    let encToken = localStorage.getItem("token");
    if(encToken){
      this.parseToken(encToken);
    }
  }

  parseToken(token: string): void {
    try {
      this.token = JSON.parse(atob(token.split(".")[1]));
    }
    catch(ex){
      console.log(ex);
    }
  }

  setToken(token: string): void {
    localStorage.setItem("token", token);
    this.parseToken(token);
    console.log(this.token);
    this.isLoggedIn = true;
  }

  logout(): void {
    localStorage.removeItem("token");
    this.token = null;
    this.isLoggedIn = false;
    this.router.navigateByUrl("/");
  }
}
