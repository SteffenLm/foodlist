export interface ISubstanceDTO {
  substanceId: string;
  substanceName: string;
  substanceDefaultUnit: {
    unitId: string;
    unitName: string;
  };
  substanceCreator: {
    userId: string;
  };
  substanceType: {
    substanceTypeId: string;
    substanceTypeName: string;
  };
}

export interface ICreateSubstanceDTO {
  substanceTypeId: string;
  substanceName: string;
  substanceDefaultUnitId: string;
}

export interface IUpdateSubstanceDTO {
  substanceId: string;
  substanceTypeId: string;
  substanceName: string;
  substanceDefaultUnitId: string;
}
