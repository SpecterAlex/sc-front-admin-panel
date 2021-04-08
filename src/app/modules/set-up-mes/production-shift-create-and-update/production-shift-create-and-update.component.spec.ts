import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionShiftCreateAndUpdateComponent } from './production-shift-create-and-update.component';

describe('ProductionShiftCreateAndUpdateComponent', () => {
  let component: ProductionShiftCreateAndUpdateComponent;
  let fixture: ComponentFixture<ProductionShiftCreateAndUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionShiftCreateAndUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionShiftCreateAndUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
