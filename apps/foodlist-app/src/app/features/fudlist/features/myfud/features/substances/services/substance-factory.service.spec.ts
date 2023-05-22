import { TestBed } from '@angular/core/testing';
import { SubstanceType } from '../models/substance.enum';
import { SubstanceFactoryService } from './substance-factory.service';

describe('Dialog Service', () => {
  let substanceFactoryService: SubstanceFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubstanceFactoryService],
    });
    substanceFactoryService = TestBed.inject(SubstanceFactoryService);
  });

  it('should be created', () => {
    expect(substanceFactoryService).toBeTruthy();
  });

  it('should return a ingredient instance', () => {
    const ingredientInstance = substanceFactoryService.createIngredient();
    expect(ingredientInstance.type).toEqual(SubstanceType.ingredient);
  });

  it('should return a spice instance', () => {
    const spiceInstance = substanceFactoryService.createSpice();
    expect(spiceInstance.type).toEqual(SubstanceType.spice);
  });

  it('should determine to return a spice instance', () => {
    const spiceInstance = substanceFactoryService.getSubstanceInstance(
      SubstanceType.spice
    );
    expect(spiceInstance.type).toEqual(SubstanceType.spice);
  });

  it('should determine to return a ingredient instance', () => {
    const ingredientInstance = substanceFactoryService.getSubstanceInstance(
      SubstanceType.ingredient
    );
    expect(ingredientInstance.type).toEqual(SubstanceType.ingredient);
  });
});
