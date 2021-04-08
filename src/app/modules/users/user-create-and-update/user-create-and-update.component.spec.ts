import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCreateAndUpdateComponent } from './user-create-and-update.component';

describe('UserCreateAndUpdateComponent', () => {
  let component: UserCreateAndUpdateComponent;
  let fixture: ComponentFixture<UserCreateAndUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCreateAndUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCreateAndUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
