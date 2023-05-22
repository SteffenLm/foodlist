import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingSpinnerButtonComponent } from '@foodlist/foodlist-app/ui';
import { CreateShoppingListComponent } from './create-shopping-list.component';

describe('CreateShoppingListComponent', () => {
  let component: CreateShoppingListComponent;
  let fixture: ComponentFixture<CreateShoppingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        CreateShoppingListComponent,
        LoadingSpinnerButtonComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateShoppingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
