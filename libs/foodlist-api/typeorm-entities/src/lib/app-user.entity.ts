import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Recipe } from './recipe.entity';
import { ShoppingList } from './shopping-list.entity';
import { Substance } from './substance.entity';

@Entity({
  name: 'app_user',
})
export class AppUser {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'user_id',
    unsigned: true,
  })
  userId: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    select: false,
    unique: true,
  })
  mail: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    select: false,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    select: false,
    unique: true,
  })
  username: string;

  @OneToMany(() => Substance, (substance) => substance.substanceCreator)
  substances: Substance[];

  @OneToMany(() => Recipe, (recipe) => recipe.recipeCreator)
  recipes: Recipe;

  @OneToMany(
    () => ShoppingList,
    (shoppingList) => shoppingList.shoppingListCreator
  )
  shoppingLists: ShoppingList;
}
