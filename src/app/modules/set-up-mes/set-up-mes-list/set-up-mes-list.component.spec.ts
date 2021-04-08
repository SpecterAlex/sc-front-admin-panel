import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetUpMesListComponent } from './set-up-mes-list.component';

describe('SetUpMesListComponent', () => {
  let component: SetUpMesListComponent;
  let fixture: ComponentFixture<SetUpMesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetUpMesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetUpMesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
