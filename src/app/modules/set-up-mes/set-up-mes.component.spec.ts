import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetUpMesComponent } from './set-up-mes.component';

describe('SetUpMesComponent', () => {
  let component: SetUpMesComponent;
  let fixture: ComponentFixture<SetUpMesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetUpMesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetUpMesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
