import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCreateAndUpdateComponent } from './product-create-and-update.component';

describe('ProductCreateAndUpdateComponent', () => {
  let component: ProductCreateAndUpdateComponent;
  let fixture: ComponentFixture<ProductCreateAndUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCreateAndUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCreateAndUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
