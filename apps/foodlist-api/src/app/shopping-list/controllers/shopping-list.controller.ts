import { RequestUser, User } from '@foodlist/foodlist-api/auth';
import { ShoppingList } from '@foodlist/foodlist-api/typeorm-entities';
import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { CreateShoppingListRequestValidator } from '../request-validators/create-shopping-list.request-validator';
import { ShoppingListService } from '../services/shopping-list.service';

@Controller('shopping-list')
export class ShoppingListController {
  constructor(private readonly shoppingListService: ShoppingListService) {}

  @Post()
  public async createShoppingList(
    @User() user: RequestUser,
    @Body() createShoppingListDTO: CreateShoppingListRequestValidator
  ): Promise<void> {
    await this.shoppingListService.createShoppingList(
      createShoppingListDTO,
      user.userId
    );
    return;
  }

  @Get()
  public async findAllShoppingListsByUserId(
    @User() user: RequestUser
  ): Promise<ShoppingList[]> {
    return await this.shoppingListService.findAllShoppingListsByUserId(
      user.userId
    );
  }

  @Get(':id')
  public async findShoppingListById(
    @User() user: RequestUser,
    @Param('id') shoppingListId: string
  ): Promise<ShoppingList> {
    try {
      await this.shoppingListService.userIsAllowedToEditShoppingList(
        shoppingListId,
        user.userId
      );
      return this.shoppingListService.findShoppingListById(shoppingListId);
    } catch {
      throw new ForbiddenException();
    }
  }
}
