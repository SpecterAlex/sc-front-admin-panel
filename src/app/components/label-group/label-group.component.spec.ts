import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelGroupComponent } from './label-group.component';

describe('LabelGroupComponent', () => {
  let component: LabelGroupComponent;
  let fixture: ComponentFixture<LabelGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabelGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
