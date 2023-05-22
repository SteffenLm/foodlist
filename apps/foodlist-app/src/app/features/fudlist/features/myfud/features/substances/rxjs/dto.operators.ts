import { OperatorFunction } from 'rxjs/internal/types';
import { map } from 'rxjs/operators';
import { Unit } from '../../../../../models/unit.model';
import {
  ICreateSubstanceDTO,
  ISubstanceDTO,
  IUpdateSubstanceDTO,
} from '../models/substance.dto';
import { SubstanceType } from '../models/substance.enum';
import { ISubstance } from '../models/substance.interface';

export const mapSubstanceInterfaceToCreateSubstanceDto: OperatorFunction<
  ISubstance,
  ICreateSubstanceDTO
> = map<ISubstance, ICreateSubstanceDTO>((substance: ISubstance) => {
  const allUnits = Object.values(Unit);
  const defaultUnit = substance.defaultUnit as unknown as number;
  const convertedDefaultUnit = allUnits[defaultUnit];

  const createSubstanceDTO: ICreateSubstanceDTO = {
    substanceDefaultUnitId: convertedDefaultUnit,
    substanceName: substance.substanceName,
    substanceTypeId:
      substance.type === SubstanceType.ingredient
        ? '00000000-0000-0000-0001-000000000001'
        : '00000000-0000-0000-0001-000000000002',
  };
  return createSubstanceDTO;
});
export const mapSubstanceInterfaceToUpdateSubstanceDto: OperatorFunction<
  ISubstance,
  IUpdateSubstanceDTO
> = map<ISubstance, IUpdateSubstanceDTO>((substance: ISubstance) => {
  const allUnits = Object.values(Unit);
  const defaultUnit = substance.defaultUnit as unknown as number;
  const convertedDefaultUnit = allUnits[defaultUnit];

  const createSubstanceDTO: IUpdateSubstanceDTO = {
    substanceId: substance.substanceId.toString(),
    substanceDefaultUnitId: convertedDefaultUnit,
    substanceName: substance.substanceName,
    substanceTypeId:
      substance.type === SubstanceType.ingredient
        ? '00000000-0000-0000-0001-000000000001'
        : '00000000-0000-0000-0001-000000000002',
  };
  return createSubstanceDTO;
});

export const mapSubstanceDtoToSubstanceInterface: OperatorFunction<
  ISubstanceDTO[],
  ISubstance[]
> = map<ISubstanceDTO[], ISubstance[]>((substancesDTO) => {
  const substances: ISubstance[] = [];
  substancesDTO.forEach((substanceDTO) => {
    const substance: ISubstance = {
      substanceId: substanceDTO.substanceId,
      substanceName: substanceDTO.substanceName,
      defaultUnit: substanceDTO.substanceDefaultUnit.unitId as Unit,
      type:
        substanceDTO.substanceType.substanceTypeId ===
        '00000000-0000-0000-0001-000000000001'
          ? SubstanceType.ingredient
          : SubstanceType.spice,
    };
    substances.push(substance);
  });
  return substances;
});
