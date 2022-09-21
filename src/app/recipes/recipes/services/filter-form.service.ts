import { Injectable } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FilterFormService {

  constructor() {
    this.initializeForm();
  }

  public form: UntypedFormGroup;

 

  protected initializeForm(): void {
    this.form = new UntypedFormGroup({
      keyword: new UntypedFormControl(""),
      sort: new UntypedFormControl("asc"),
      recipeGroup: new UntypedFormArray([])
    })
  }


}
