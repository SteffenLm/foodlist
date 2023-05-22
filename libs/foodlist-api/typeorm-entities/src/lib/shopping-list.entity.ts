import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AppUser } from './app-user.entity';

@Entity({ name: 'shopping_list' })
export class ShoppingList {
  @PrimaryGeneratedColumn({
    name: 'shopping_list_id',
    unsigned: true,
    type: 'bigint',
  })
  shoppingListId: string;

  @Column({
    name: 'shopping_list_name',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  shoppingListName: string;

  @ManyToOne(() => AppUser, (appUser) => appUser.shoppingLists)
  @JoinColumn({ name: 'shopping_list_creator' })
  shoppingListCreator: AppUser;
}
