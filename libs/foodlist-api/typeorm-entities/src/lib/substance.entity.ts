import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AppUser } from './app-user.entity';
import { RecipeSubstance } from './recipe-substance.entity';
import { SubstanceType } from './substance-type.entity';
import { Unit } from './unit.entity';

@Entity({
  name: 'substance',
})
export class Substance {
  @PrimaryGeneratedColumn({
    name: 'substance_id',
    type: 'bigint',
    unsigned: true,
  })
  substanceId: string;

  @Column({
    name: 'substance_name',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  substanceName: string;

  @ManyToOne(() => SubstanceType, (substanceType) => substanceType.substances)
  @JoinColumn({ name: 'substance_type' })
  substanceType: SubstanceType;

  @ManyToOne(() => AppUser, (appUser) => appUser.substances)
  @JoinColumn({ name: 'substance_creator' })
  substanceCreator: AppUser;

  @ManyToOne(() => Unit, (unit) => unit.substances)
  @JoinColumn({ name: 'substance_default_unit' })
  substanceDefaultUnit: Unit;

  @OneToMany(
    () => RecipeSubstance,
    (recipeSubstance) => recipeSubstance.substance
  )
  recipeSubstances: RecipeSubstance[];
}
