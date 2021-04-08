import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressCreateAndUpdateComponent } from './address-create-and-update.component';

describe('AddressCreateAndUpdateComponent', () => {
  let component: AddressCreateAndUpdateComponent;
  let fixture: ComponentFixture<AddressCreateAndUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressCreateAndUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressCreateAndUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
