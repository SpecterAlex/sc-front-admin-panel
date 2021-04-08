import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionOrderDetailsComponent } from './production-order-details.component';

describe('ProductionOrderDetailsComponent', () => {
  let component: ProductionOrderDetailsComponent;
  let fixture: ComponentFixture<ProductionOrderDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionOrderDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
