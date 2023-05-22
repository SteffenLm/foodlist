import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingListDto } from '../model/shopping-list-dto-model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListHttpService {
  constructor(private readonly httpClient: HttpClient) {}

  public getAllShoppingLists(): Observable<ShoppingListDto[]> {
    return this.httpClient.get<ShoppingListDto[]>(`/api/shopping-list`);
  }
}
