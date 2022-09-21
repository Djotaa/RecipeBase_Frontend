import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { BaseFormService } from 'src/app/shared/services/base-form.service';
import { RegisterApiService } from '../api/register-api.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterFormService extends BaseFormService{

  constructor(private registerApi: RegisterApiService) { 
    super();
  }

  public form: FormGroup;


  public initializeForm(): void {

    this.form = new FormGroup({
      fullName: new FormControl("", [Validators.required, Validators.minLength(3), Validators.pattern(/^\p{Lu}\p{Ll}{1,20}(\s\p{L}{2,20}){1,}$/u)]),
      username: new FormControl("", [Validators.required, Validators.minLength(3), Validators.pattern(/^\p{L}[\d\p{L}]*$/u)]),
      email: new FormControl("", [Validators.email, Validators.required]),
      password: new FormControl("", [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)])
    });
  }

  protected prepareDataToSend(): any {
    return this.form.value;
  }

  public submit(): Observable<any> {
    
    return this.registerApi.create(this.prepareDataToSend());
  }
}
