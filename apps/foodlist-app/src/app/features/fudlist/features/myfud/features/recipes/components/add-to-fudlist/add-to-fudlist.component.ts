import { NgFor } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { unitTextsLong } from '../../../../../../models/unit.model';
import { SubstanceType } from '../../../substances/models/substance.enum';
import { IRecipe, ISubstanceEntry } from '../../models/recipe.model';

@Component({
  selector: 'foodlist-add-to-fudlist',
  templateUrl: './add-to-fudlist.component.html',
  styleUrls: ['./add-to-fudlist.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    NgFor,
    MatButtonModule,
  ],
})
export class AddToFudlistComponent {
  // public lists: IMyList[] = [];
  public ingredients: ISubstanceEntry[];
  public spices: ISubstanceEntry[];
  public unitTexts = unitTextsLong;

  public allComplete = true;

  constructor(
    public dialogRef: MatDialogRef<AddToFudlistComponent>,
    @Inject(MAT_DIALOG_DATA) private data: AddToFudlistComponentData
  ) {
    // this.lists = this.listService.getLists();
    this.ingredients = this.data.recipe.containedSubstances.filter(
      (a) => a.substance.type === SubstanceType.ingredient
    );
    this.spices = this.data.recipe.containedSubstances.filter(
      (a) => a.substance.type === SubstanceType.spice
    );
  }

  public onSubmit(): void {
    // const substanceEntries: SubstanceShoppingListItem[] = [];
    // this.ingredients.forEach((ingredient) => {
    //   // substanceEntries.push(new SubstanceItem(ingredient, false));
    // });
    // this.listService.addSubstancesToList(0, substanceEntries);
    this.dialogRef.close();
  }
}

export interface AddToFudlistComponentData {
  recipe: IRecipe;
}
