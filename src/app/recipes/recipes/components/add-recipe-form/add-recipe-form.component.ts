import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerFunctions } from 'src/app/shared/classes/spinner-functions';
import { IRecipeGroup } from 'src/app/shared/interfaces/i-recipe-group';
import { RecipeGroupsApiService } from 'src/app/shared/services/recipe-groups-api.service';
import { MessageService } from 'primeng/api';
import { RecipesApiService } from 'src/app/shared/services/recipes-api.service';

export interface Ingredient {
  id: string;
  item: string;
}

export interface Direction {
  id: string;
  step: string;
}

@Component({
  selector: 'app-add-recipe-form',
  templateUrl: './add-recipe-form.component.html',
  styleUrls: ['./add-recipe-form.component.scss'],
  providers: [MessageService]
})
export class AddRecipeFormComponent implements OnInit {

  form: FormGroup;
  isReady: boolean = true;
  filePath: string;

  ingredients: Ingredient[];

  ingredientsToSend: string[];

  clonedIngredients: { [s: string]: Ingredient } = {};

  directions: Direction[];

  clonedDirections: { [s: string]: Direction } = {};


  recipeGroups: IRecipeGroup[];

  errorMsg: string;

  isEdit: boolean = false;
  recipeId: number | string;


  @ViewChild("file") fileInput: ElementRef;


  constructor(
    private activatedRoute: ActivatedRoute,
    private recipeGroupSerivce: RecipeGroupsApiService,
    private recipeService: RecipesApiService,
    private router: Router,
    private messageService: MessageService
  ) { }


  setFilePath(path: string): void {
    this.filePath = path;
  }

  ngOnInit(): void {
    this.recipeId = this.activatedRoute.snapshot.params["id"];
    this.isEdit = !!this.recipeId;
    this.recipeGroupSerivce.getAll().subscribe({
      next: (data: any) => {
        this.recipeGroups = data;
      }
    })

    this.ingredients = this.isEdit ? [] : [{ id: this.generateId(), item: 'New ingredient' }]
    this.directions = this.isEdit ? [] : [{ id: this.generateId(), step: 'Step 1' }]

    if (this.isEdit)
      this.recipeService.get(this.recipeId).subscribe({
        next: (data: any) => {
          this.form.setValue({
            title: data.title,
            prepTime: data.prepTime,
            categoryId: data.categoryId
          })

          data.directions.map((x: string) => {
            this.directions.push({
              id: this.generateId(),
              step: x
            })
          })

          data.ingredients.map((x: string) => {
            this.ingredients.push({
              id: this.generateId(),
              item: x
            })
          })
        }
      })

    this.form = new FormGroup({
      title: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      prepTime: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(35)]),
      categoryId: new FormControl("", [Validators.required])
    });
  }


  generateId() {
    let text = '';
    let possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  onRowEditInit(element: any, type: string) {
    if(type == 'ingredient'){
      this.clonedIngredients[element.id] = { ...element };
    }
    else{
      this.clonedDirections[element.id] = { ...element };
    }
  }
  

  onRowEditSave(ingredient: Ingredient, index: number) {
    if (ingredient.item.length > 3 && ingredient.item.length <= 50) {
      delete this.clonedIngredients[ingredient.id];
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Ingredient is updated',
      });
    } else {
      this.ingredients[index] = this.clonedIngredients[ingredient.id];
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Ingredient is required and must be between 3 and 50 characters.',
      });
    }
  }

  onRowEditCancel(element: Ingredient | Direction, index: number, type: string) {
    if (type == 'ingredient') {
      this.ingredients[index] = this.clonedIngredients[element.id];
      delete this.clonedIngredients[element.id];
    }
    else{
      this.directions[index] = this.clonedDirections[element.id];
    delete this.clonedDirections[element.id];
    }
  }

  addIngredient() {
    this.ingredients.push({ id: this.generateId(), item: 'New ingredient' });
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);

  }

  addDirection() {
    this.directions.push({ id: this.generateId(), step: 'New step' });
  }


  deleteDirection(index: number) {
    this.directions.splice(index, 1);
  }



  send(): void {
    let formData = new FormData()
    formData.append("title", this.form.get("title").value);
    formData.append("prepTime", this.form.get("prepTime").value);
    formData.append("categoryId", this.form.get("categoryId").value);


    if (!this.isEdit || (this.isEdit && this.fileInput.nativeElement.files.length))
      formData.append("image", this.fileInput.nativeElement.files[0]);

    this.ingredients.forEach(x => formData.append("ingredients[]", String(x.item)));

    this.directions.forEach(x => formData.append("directions[]", String(x.step)));

    SpinnerFunctions.showSpinner();

    if (!this.isEdit) {
      this.recipeService.create(formData).subscribe({
        next: (data: any) => {
          SpinnerFunctions.hideSpinner();
          this.router.navigateByUrl("/profile", { state: { action: 'added' } });
        },
        error: (err: any) => this.errorHandler(err)
      });
    }
    else {
      this.recipeService.update(this.recipeId, formData).subscribe({
        next: (data: any) => {
          SpinnerFunctions.hideSpinner();
          this.router.navigateByUrl("/profile", { state: { action: 'edited' } });
        },
        error: (err: any) => this.errorHandler(err)
      });
    }
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

  // this.router.navigateByUrl("/profile", { state: { action: 'edited' } });


}
