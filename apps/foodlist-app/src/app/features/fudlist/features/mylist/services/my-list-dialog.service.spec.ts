import { TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MyListDialogService } from './my-list-dialog.service';

describe('MyListDialogService', () => {
  let service: MyListDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
    });
    service = TestBed.inject(MyListDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
