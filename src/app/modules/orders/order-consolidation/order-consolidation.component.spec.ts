import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderConsolidationComponent } from './order-consolidation.component';

describe('OrderConsolidationComponent', () => {
  let component: OrderConsolidationComponent;
  let fixture: ComponentFixture<OrderConsolidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderConsolidationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderConsolidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
