import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerFunctions } from 'src/app/shared/classes/spinner-functions';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoginFormService } from '../../services/form/login-form.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorMsg: string = "";
  justRegistered: boolean = false;

  constructor(
    public formService: LoginFormService,
    public authService: AuthService,
    public router: Router
  ) { 
      if(history.state['registered'])
        this.justRegistered = true;
  }

  ngOnInit(): void {
    this.formService.initializeForm();
  }

  send(): void{

    SpinnerFunctions.showSpinner();

    this.formService.submit().subscribe({
      next: data => {
        this.authService.setToken(data.token);
        SpinnerFunctions.hideSpinner();
        this.router.navigateByUrl("/");
      },
      error: err => {
        console.log(err)
        if(err.status == 401){
          this.errorMsg = "Wrong username and/or password.";
        }
        SpinnerFunctions.hideSpinner();
      }
    })
  }

}
