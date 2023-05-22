import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingSpinnerButtonComponent } from './loading-spinner-button.component';

describe('LoadingSpinnerButtonComponent', () => {
  let component: LoadingSpinnerButtonComponent;
  let fixture: ComponentFixture<LoadingSpinnerButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingSpinnerButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingSpinnerButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
