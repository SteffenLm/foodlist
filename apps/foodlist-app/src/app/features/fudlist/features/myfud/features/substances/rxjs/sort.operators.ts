import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { ISubstance } from '../models/substance.interface';

export const sortSubstancesAscendingByName: OperatorFunction<
  ISubstance[],
  ISubstance[]
> = map<ISubstance[], ISubstance[]>((substances) =>
  substances.sort(sortTwoSubstancesAscendingByName)
);

export const sortTwoSubstancesAscendingByName: (
  substanceOne: ISubstance,
  substanceTwo: ISubstance
) => SortResult = (substanceOne, substanceTwo) => {
  if (
    substanceOne.substanceName.toLowerCase() >
    substanceTwo.substanceName.toLowerCase()
  ) {
    return SortResult.higher;
  } else if (
    substanceOne.substanceName.toLowerCase() <
    substanceTwo.substanceName.toLowerCase()
  ) {
    return SortResult.lower;
  } else {
    return SortResult.equal;
  }
};

enum SortResult {
  lower = -1,
  higher = 1,
  equal = 0,
}
