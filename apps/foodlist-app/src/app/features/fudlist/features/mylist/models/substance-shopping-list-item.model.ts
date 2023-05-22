import { ISubstanceEntry } from '../../myfud/features/recipes/models/recipe.model';
import { IShoppingListItem } from './shopping-list.model';

export class SubstanceShoppingListItem implements IShoppingListItem {
  constructor(
    public substanceEntry: ISubstanceEntry,
    public done: boolean,
    private unitTexts: string[]
  ) {}

  public getItemText(): string {
    return `${this.substanceEntry.substance} (${this.substanceEntry.amount} ${
      this.unitTexts[this.substanceEntry.unit]
    })`;
  }
}
