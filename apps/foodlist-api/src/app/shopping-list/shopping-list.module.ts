import { ShoppingList } from '@foodlist/foodlist-api/typeorm-entities';
import { UnitsModule } from '@foodlist/foodlist-api/units';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingListController } from './controllers/shopping-list.controller';
import { ShoppingListService } from './services/shopping-list.service';

@Module({
  imports: [UnitsModule, TypeOrmModule.forFeature([ShoppingList])],
  controllers: [ShoppingListController],
  providers: [ShoppingListService],
})
export class ShoppingListModule {}
