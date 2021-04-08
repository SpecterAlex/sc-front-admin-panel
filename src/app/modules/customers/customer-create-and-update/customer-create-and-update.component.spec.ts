import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCreateAndUpdateComponent } from './customer-create-and-update.component';

describe('CustomerCreateAndUpdateComponent', () => {
  let component: CustomerCreateAndUpdateComponent;
  let fixture: ComponentFixture<CustomerCreateAndUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerCreateAndUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerCreateAndUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
