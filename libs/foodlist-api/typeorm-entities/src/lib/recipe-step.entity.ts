import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Recipe } from './recipe.entity';

@Entity({ name: 'recipe_step' })
export class RecipeStep {
  @PrimaryColumn({
    name: 'recipe_step_id',
    unsigned: true,
    type: 'bigint',
  })
  recipeStepId: string;

  @Column({
    name: 'recipe_id',
    type: 'bigint',
    nullable: false,
  })
  recipeId: string;

  @Column({
    name: 'step_instruction',
    type: 'text',
    nullable: false,
  })
  stepInstruction: string;

  @Column({
    name: 'step_number',
    type: 'int',
    nullable: false,
  })
  stepNumber: number;

  @ManyToOne(() => Recipe, (recipe) => recipe.recipeId)
  @JoinColumn({ name: 'recipe_id' })
  recipe: Recipe;
}
