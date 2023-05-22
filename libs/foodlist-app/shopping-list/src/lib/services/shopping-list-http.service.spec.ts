import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ShoppingListHttpService } from './shopping-list-http.service';

describe('ShoppingListHttpService', () => {
  let service: ShoppingListHttpService;
  let httpClientMock: Partial<HttpClient>;

  beforeEach(() => {
    httpClientMock = {
      get: jest.fn(),
    };
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: httpClientMock,
        },
      ],
    });
    service = TestBed.inject(ShoppingListHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllShoppingLists', () => {
    it('should make a get http call to /api/shopping-list', () => {
      service.getAllShoppingLists();

      expect(httpClientMock.get).toHaveBeenCalledWith('/api/shopping-list');
    });
  });
});
