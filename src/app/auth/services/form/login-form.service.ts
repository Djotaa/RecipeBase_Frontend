import { Injectable } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { BaseFormService } from 'src/app/shared/services/base-form.service';
import { LoginApiService } from '../api/login-api.service';

@Injectable({
  providedIn: 'root'
})
export class LoginFormService extends BaseFormService {

  public form: UntypedFormGroup;

  constructor(public loginApiService: LoginApiService) { 
    super();
  }

  public initializeForm(): void {
    this.form = new UntypedFormGroup({
      username: new UntypedFormControl("", [Validators.required, Validators.minLength(3)]),
      password: new UntypedFormControl("", [Validators.required, Validators.minLength(3)])
    });
  }
  
  protected prepareDataToSend(): any {
    return this.form.value;
  }
  
  public submit(): Observable<any> {

    let data: any = this.prepareDataToSend();  

    return this.loginApiService.create(data);
    
  }
}
