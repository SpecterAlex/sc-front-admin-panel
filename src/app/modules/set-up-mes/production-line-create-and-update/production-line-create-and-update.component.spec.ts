import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionLineCreateAndUpdateComponent } from './production-line-create-and-update.component';

describe('ProductionLineCreateAndUpdateComponent', () => {
  let component: ProductionLineCreateAndUpdateComponent;
  let fixture: ComponentFixture<ProductionLineCreateAndUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionLineCreateAndUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionLineCreateAndUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
