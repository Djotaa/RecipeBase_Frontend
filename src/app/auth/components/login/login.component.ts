import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerFunctions } from 'src/app/shared/classes/spinner-functions';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoginFormService } from '../../services/form/login-form.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  errorMsg: string = "";
  justRegistered: boolean = false;

  constructor(
    public formService: LoginFormService,
    public authService: AuthService,
    public router: Router,
    public messageService: MessageService
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
      next: (data:any) => {
        this.authService.setToken(data.token);
        SpinnerFunctions.hideSpinner();
        if(this.authService.token.Username == 'Admin'){
          window.location.href = "/admin/messages";
        }
        else{
          this.router.navigateByUrl('/');
        }
      },
      error: (err:any) => {
        if(err.status == 401){
          this.errorMsg = "Wrong username and/or password.";
          this.messageService.add({
            severity: 'error',
            summary: 'Invalid login',
            detail: 'Wrong username and/or password.',
            life: 3000
          })
        }
        SpinnerFunctions.hideSpinner();
      }
    })
  }

}
