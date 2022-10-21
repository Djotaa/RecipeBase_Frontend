import { Injectable } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { SpinnerFunctions } from 'src/app/shared/classes/spinner-functions';
import { BaseFormService } from 'src/app/shared/services/base-form.service';
import { ContactApiService } from './contact-api.service';

@Injectable({
  providedIn: 'root'
})
export class ContactFormService extends BaseFormService{

  public form: UntypedFormGroup;

  public message: string;
  public messageColorClass: string;

  constructor(private contactApi: ContactApiService) { 
    super();
  }

  public initializeForm(): void{
    this.form = new UntypedFormGroup({
      fullName: new UntypedFormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern(/^\p{Lu}\p{Ll}{1,20}(\s\p{L}{2,20}){1,}$/u)]),
      email: new UntypedFormControl("", [Validators.email, Validators.required, Validators.maxLength(50)]),
      message: new UntypedFormControl("", [Validators.required, Validators.minLength(10), Validators.maxLength(200)])
    });
  }

  public submit(): void {
    SpinnerFunctions.showSpinner();

    let dataToSend = this.prepareDataToSend();

    this.form.reset();

    this.contactApi.create(dataToSend).subscribe({
      next: data => {
        this.messageColorClass = "text-success";
        this.message = "Your message has been successfully sent.";
        setTimeout(()=>this.message = "", 2500);
        SpinnerFunctions.hideSpinner();
      },
      error: err => {
        console.log(err);
        this.messageColorClass = "text-danger";
        this.message = "Your message couldn't be sent. " + (err.status ? `(${err.status})` : "");
        setTimeout(()=>this.message = "", 2500);
        SpinnerFunctions.hideSpinner();
      }
    })
  }

  protected prepareDataToSend(): any {
    return this.form.value;
  }
}
