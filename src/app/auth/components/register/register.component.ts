import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerFunctions } from 'src/app/shared/classes/spinner-functions';
import { RegisterFormService } from '../../services/form/register-form.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  errorMsg: string = "";

  constructor(
    public router: Router,
    public formService: RegisterFormService
    ) { }

  ngOnInit(): void {
    this.formService.initializeForm();
  }

  send(): void {

    SpinnerFunctions.showSpinner();
    this.formService.submit().subscribe({
      next: data => {
        SpinnerFunctions.hideSpinner();
        this.router.navigateByUrl("/login", { state: { registered: true } });
      },
      error: err => {
        SpinnerFunctions.hideSpinner();
        console.log(err);
        if(err.error && err.error.message){
          this.errorMsg = err.error.message;
        }
        else if(err.error && err.error.errors){
          this.errorMsg = err.error.errors.map((x: any) => x.error).join("<br/>");
        }
        else {
          this.errorMsg = "Registration has failed. Try again later.";
        }
      }
    })
  }

}
