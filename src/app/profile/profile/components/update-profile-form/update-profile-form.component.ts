import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SpinnerFunctions } from 'src/app/shared/classes/spinner-functions';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UsersApiService } from '../../../../shared/services/users-api.service';

@Component({
  selector: 'app-update-profile-form',
  templateUrl: './update-profile-form.component.html',
  styleUrls: ['./update-profile-form.component.scss']
})
export class UpdateProfileFormComponent implements OnInit {

  form: FormGroup;
  errorMsg: string = "";

  userId: number | string;

  @Output() updatedProfile = new EventEmitter<string>();
  
  constructor(
    private tokenService: AuthService,
    private userService: UsersApiService
  ) { }

  ngOnInit(): void {
    this.userId = this.tokenService.token.UserId;

    this.setFormData();

    this.form = new FormGroup({
      fullName: new FormControl("", [Validators.required, Validators.minLength(3), Validators.pattern(/^\p{Lu}\p{Ll}{1,20}(\s\p{L}{2,20}){1,}$/u)]),
      username: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(/^\p{L}[\d\p{L}]*$/u)]),
      email: new FormControl("", [Validators.email, Validators.required])
    });
  }

  setFormData(){
    this.userService.get(this.userId).subscribe({
      next: data => {
        this.form.setValue({
          fullName: data.fullName,
          username: data.username,
          email: data.email
        })
      }
    });
  }

  protected prepareDataToSend(): any {
    return this.form.value;
  }

  send(){
    SpinnerFunctions.showSpinner();
    this.userService.update(this.userId, this.prepareDataToSend()).subscribe({
      next: (data: any) => {
        SpinnerFunctions.hideSpinner();
        this.updatedProfile.emit('deleted');
      },
      error: (err: any) => this.errorHandler(err)
    });
    
  }

  errorHandler(err: any): void {
    SpinnerFunctions.hideSpinner();
    console.log(err);
    if (err.error && err.error.message) {
      this.errorMsg = "An error has occurred: " + err.error.message;
    }
    else if (err.error && err.error.errors) {
      this.errorMsg = err.error.errors.map((x: any) => x.error).join("<br/>");
    }
    else {
      this.errorMsg = "An error has occurred. Try again later.";
    }
  }



}
