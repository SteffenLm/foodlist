import {
  Recipe,
  RecipeStep,
  RecipeSubstance,
} from '@foodlist/foodlist-api/typeorm-entities';
import { UnitsModule } from '@foodlist/foodlist-api/units';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeStepController } from './controllers/recipe-step.controller';
import { RecipeSubstanceController } from './controllers/recipe-substance.controller';
import { RecipeController } from './controllers/recipe.controller';
import { RecipeStepService } from './services/recipe-step.service';
import { RecipeSubstanceService } from './services/recipe-substance.service';
import { RecipeService } from './services/recipe.service';

@Module({
  imports: [
    UnitsModule,
    TypeOrmModule.forFeature([Recipe, RecipeSubstance, RecipeStep]),
  ],
  controllers: [
    RecipeController,
    RecipeSubstanceController,
    RecipeStepController,
  ],
  providers: [RecipeService, RecipeSubstanceService, RecipeStepService],
})
export class RecipeModule {}
