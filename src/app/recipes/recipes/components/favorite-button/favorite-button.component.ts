import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FavoritesService } from '../../../../shared/services/favorites.service';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.scss']
})
export class FavoriteButtonComponent implements OnInit {

  @Input() selected: boolean = false;
  @Input() recipeId: number | string;
  @Output() selectedChange = new EventEmitter<boolean>();

  constructor(
    private favoriteService: FavoritesService
    ) { }

  ngOnInit(): void {
    this.favoriteService.getAll().subscribe({
      next: data => {
        if(data.some(x=>x.id == this.recipeId))
          this.selected = true;
      }
    })
  }



  public toggleFavorite() {
    this.selected = !this.selected;
    if(this.selected){
      this.favoriteService.create(this.recipeId).subscribe({
        next: data => console.log("Added to favorites"),
        error: err => console.log(err)
      });
    }
    else{
      this.favoriteService.delete(this.recipeId).subscribe({
        next: data => console.log("Removed from favorites"),
        error: err => console.log(err)
      });
    }

    this.selectedChange.emit(this.selected);
  }
}
