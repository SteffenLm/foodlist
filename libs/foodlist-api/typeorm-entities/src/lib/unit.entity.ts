import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RecipeSubstance } from './recipe-substance.entity';
import { Substance } from './substance.entity';

@Entity({
  name: 'unit',
})
export class Unit {
  @PrimaryGeneratedColumn({
    name: 'unit_id',
    type: 'bigint',
    unsigned: true,
  })
  unitId: string;

  @Column({
    name: 'unit_name',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  unitName: string;

  @OneToMany(() => Substance, (substance) => substance.substanceDefaultUnit)
  substances: Substance[];

  @OneToMany(
    () => RecipeSubstance,
    (recipeSubstance) => recipeSubstance.substanceUnit
  )
  recipeSubstances: RecipeSubstance[];
}
