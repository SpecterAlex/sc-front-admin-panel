import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionStationCreateAndUpdateComponent } from './production-station-create-and-update.component';

describe('ProductionStationCreateAndUpdateComponent', () => {
  let component: ProductionStationCreateAndUpdateComponent;
  let fixture: ComponentFixture<ProductionStationCreateAndUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionStationCreateAndUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionStationCreateAndUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
