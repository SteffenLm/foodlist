import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Recipe } from './recipe.entity';
import { Substance } from './substance.entity';
import { Unit } from './unit.entity';

@Entity({ name: 'recipe_substance' })
export class RecipeSubstance {
  @PrimaryColumn({
    name: 'recipe_id',
    unsigned: true,
    type: 'bigint',
  })
  recipeId: string;

  @PrimaryColumn({
    name: 'substance_id',
    unsigned: true,
    type: 'bigint',
  })
  substanceId: string;

  @Column({
    name: 'substance_amount',
    type: 'decimal',
    precision: 6,
    scale: 2,
    nullable: false,
  })
  substanceAmount: number;

  @ManyToOne(() => Substance, (substance) => substance.substanceId)
  @JoinColumn({ name: 'substance_id' })
  substance: Substance;

  @ManyToOne(() => Recipe, (recipe) => recipe.recipeId)
  @JoinColumn({ name: 'recipe_id' })
  recipe: Recipe;

  @ManyToOne(() => Unit, (unit) => unit.recipeSubstances)
  @JoinColumn({ name: 'substance_unit' })
  substanceUnit: Unit;
}
