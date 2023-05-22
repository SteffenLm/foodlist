import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Substance } from './substance.entity';

@Entity({
  name: 'substance_type',
})
export class SubstanceType {
  @PrimaryColumn({
    name: 'substance_type_id',
    type: 'bigint',
    unsigned: true,
  })
  substanceTypeId: string;

  @Column({
    name: 'substance_type_name',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  substanceTypeName: string;

  @OneToMany(() => Substance, (substance) => substance.substanceType)
  substances: Substance[];
}
