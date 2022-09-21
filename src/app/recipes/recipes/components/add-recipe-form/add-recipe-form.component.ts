import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerFunctions } from 'src/app/shared/classes/spinner-functions';
import { IRecipeGroup } from 'src/app/shared/interfaces/i-recipe-group';
import { RecipeGroupsApiService } from 'src/app/shared/services/recipe-groups-api.service';
import { RecipesApiService } from 'src/app/shared/services/recipes-api.service';

@Component({
  selector: 'app-add-recipe-form',
  templateUrl: './add-recipe-form.component.html',
  styleUrls: ['./add-recipe-form.component.scss']
})
export class AddRecipeFormComponent implements OnInit {

  form: FormGroup;
  isReady: boolean = true;
  filePath: string;

  ingredients: string[] = [];
  directions: string[] = [];
  ingredient: string;
  direction: string;
  recipeGroups: IRecipeGroup[];

  errorMsg: string;

  isEdit: boolean = false;
  recipeId: number | string;


  @ViewChild("file") fileInput: ElementRef;


  constructor(    
    private activatedRoute: ActivatedRoute,
    private recipeGroupSerivce: RecipeGroupsApiService,
    private recipeService: RecipesApiService,
    private router: Router
  ) { }

  
  setFilePath(path: string): void{
    this.filePath = path;
  }

  ngOnInit(): void {
    this.recipeId = this.activatedRoute.snapshot.params["id"];
    this.isEdit = !!this.recipeId;
    this.recipeGroupSerivce.getAll().subscribe({
      next: data => {
        this.recipeGroups = data;
      }
    })

    if(this.isEdit)
    this.recipeService.get(this.recipeId).subscribe({
      next: data => {
        this.form.setValue({
          title: data.title,
          prepTime: data.prepTime,
          categoryId: data.categoryId
        })
        this.directions = data.directions;
        this.ingredients = data.ingredients;
      }
    })

    this.form = new FormGroup({
      title: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      prepTime: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(35)]),
      categoryId: new FormControl("", [Validators.required])
    });
  }

  pushIngredient():void {
    if(this.ingredient){
      this.ingredients.push(this.ingredient);
      this.ingredient = "";
    }
  }

  removeIngredient(id: number): void{
    this.ingredients.splice(id,1);
    console.log(this.ingredients)
  }

  pushDirection():void {
    if(this.direction){
      this.directions.push(this.direction);
      this.direction = "";
    }
  }

  removeDirection(id: number): void{
    this.directions.splice(id,1);
    console.log(this.directions)
  }

  


  send(): void{
    let formData = new FormData()
    formData.append("title", this.form.get("title").value);
    formData.append("prepTime", this.form.get("prepTime").value);
    formData.append("categoryId", this.form.get("categoryId").value);

    
    if(!this.isEdit || (this.isEdit && this.fileInput.nativeElement.files.length))
      formData.append("image", this.fileInput.nativeElement.files[0]);

    this.ingredients.forEach(x => formData.append("ingredients[]", String(x)));

    this.directions.forEach(x => formData.append("directions[]", String(x)));

    SpinnerFunctions.showSpinner();

    if(!this.isEdit){
      this.recipeService.create(formData).subscribe({
        next: data => {
          SpinnerFunctions.hideSpinner();
          this.router.navigateByUrl("/profile", { state: { action: 'added' } });
        },
        error: err => this.errorHandler(err)
      });
    }
    else{
      this.recipeService.update(this.recipeId, formData).subscribe({
        next: data => {
          SpinnerFunctions.hideSpinner();
          this.router.navigateByUrl("/profile", { state: { action: 'edited' } });
        },
        error: err => this.errorHandler(err)
      });
    }
  }


  errorHandler(err: any): void {

    SpinnerFunctions.hideSpinner();
    console.log(err);
    if(err.error && err.error.message){
      this.errorMsg = "An error has occurred: " + err.error.message;
    }
    else if(err.error && err.error.errors){
      this.errorMsg = err.error.errors.map((x: any) => x.error).join("<br/>");
    }
    else {
      this.errorMsg = "An error has occurred. Try again later.";
    }
  }

  // this.router.navigateByUrl("/profile", { state: { action: 'edited' } });


}
