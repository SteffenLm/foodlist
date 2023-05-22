import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AppUser } from './app-user.entity';
import { RecipeStep } from './recipe-step.entity';
import { RecipeSubstance } from './recipe-substance.entity';

@Entity({ name: 'recipe' })
export class Recipe {
  @PrimaryGeneratedColumn({
    name: 'recipe_id',
    unsigned: true,
    type: 'bigint',
  })
  recipeId: string;

  @Column({
    name: 'recipe_name',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  recipeName: string;

  @Column({
    name: 'recipe_servings',
    type: 'int',
    unsigned: true,
    nullable: false,
    default: 2,
  })
  recipeServings: number;

  @ManyToOne(() => AppUser, (appUser) => appUser.recipes)
  @JoinColumn({ name: 'recipe_creator' })
  recipeCreator: AppUser;

  @OneToMany(() => RecipeSubstance, (recipeSubstance) => recipeSubstance.recipe)
  recipeSubstances: RecipeSubstance[];

  @OneToMany(() => RecipeStep, (recipeStep) => recipeStep.recipe)
  recipeSteps: RecipeStep[];
}
