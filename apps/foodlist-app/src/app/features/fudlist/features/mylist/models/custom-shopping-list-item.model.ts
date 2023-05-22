import { IShoppingListItem } from './shopping-list.model';

export class CustomShoppingListItem implements IShoppingListItem {
  constructor(public title: string, public done: boolean) {}

  public getItemText(): string {
    return this.title;
  }
}
