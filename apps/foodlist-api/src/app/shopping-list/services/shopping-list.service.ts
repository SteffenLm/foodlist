import { AppUser, ShoppingList } from '@foodlist/foodlist-api/typeorm-entities';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateShoppingListRequestValidator } from '../request-validators/create-shopping-list.request-validator';

@Injectable()
export class ShoppingListService {
  constructor(
    @InjectRepository(ShoppingList)
    private readonly shoppingListRepository: Repository<ShoppingList>
  ) {}

  public async createShoppingList(
    createShoppingListDTO: CreateShoppingListRequestValidator,
    creatorUserId: string
  ): Promise<void> {
    const newShoppingList = this.shoppingListRepository.create();
    newShoppingList.shoppingListName = createShoppingListDTO.shoppingListName;
    newShoppingList.shoppingListCreator = {} as AppUser;
    newShoppingList.shoppingListCreator.userId = creatorUserId;
    await this.shoppingListRepository.insert(newShoppingList);
    return;
  }

  public async findAllShoppingListsByUserId(userId: string) {
    return this.shoppingListRepository.find({
      where: {
        shoppingListCreator: {
          userId: userId,
        },
      },
    });
  }

  public async findShoppingListById(
    shoppingListId: string
  ): Promise<ShoppingList> {
    return this.shoppingListRepository.findOne({
      where: {
        shoppingListId,
      },
      relations: ['shoppingListCreator'],
    });
  }

  public async userIsAllowedToEditShoppingList(
    shoppingListId: string,
    userId: string
  ): Promise<boolean> {
    const shoppingList = await this.findShoppingListById(shoppingListId);
    if (shoppingList.shoppingListCreator.userId === userId) {
      return true;
    } else {
      throw new ForbiddenException();
    }
  }
}
