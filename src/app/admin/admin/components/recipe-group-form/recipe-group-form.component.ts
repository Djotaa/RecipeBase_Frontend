import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerFunctions } from 'src/app/shared/classes/spinner-functions';
import { IRecipeGroup } from 'src/app/shared/interfaces/i-recipe-group';
import { RecipeGroupsApiService } from 'src/app/shared/services/recipe-groups-api.service';

@Component({
  selector: 'app-recipe-group-form',
  templateUrl: './recipe-group-form.component.html',
  styleUrls: ['./recipe-group-form.component.scss']
})
export class RecipeGroupFormComponent implements OnInit {

  form: FormGroup;
  isReady: boolean = true;
  filePath: string;

  errorMsg: string;

  isEdit: boolean = false;
  groupId: number | string;

  recipeGroup: IRecipeGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private recipeGroupSerivce: RecipeGroupsApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.groupId = this.activatedRoute.snapshot.params["id"];
    this.isEdit = !!this.groupId;
    if(this.groupId){
      this.recipeGroupSerivce.get(this.groupId).subscribe({
        next: data => {
          this.recipeGroup = data;
          this.form.setValue({name: this.recipeGroup.name})
        }
      })
    }

    this.form = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(50)])
    });
  }

  send(): void{
    if(this.isEdit){
      SpinnerFunctions.showSpinner();

      this.recipeGroupSerivce.update(this.groupId, this.form.value).subscribe({
        next: data => {
          SpinnerFunctions.hideSpinner();
          this.router.navigateByUrl("/admin/recipe-groups", { state: { action: 'edited' } });
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
            this.errorMsg = "Update has failed. Try again later.";
          }
        }
      })
      
    }
    else{
      SpinnerFunctions.showSpinner();

      this.recipeGroupSerivce.create(this.form.value).subscribe({
        next: data => {
          SpinnerFunctions.hideSpinner();
          this.router.navigateByUrl("/admin/recipe-groups", { state: { action: 'added' } });
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
            this.errorMsg = "Update has failed. Try again later.";
          }
        }
      })
    }
  }

}
