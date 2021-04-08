import { getAttrsForDirectiveMatching } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormValidators } from '../../components/form-group/helpers/form-validators';
import { ILogin, IResponse } from '../../core/interfaces/back-end.interface';
import { RolePermissionsService } from '../../core/services/role-permissions.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  private subscriptions = new Subject();

  signInForm: FormGroup;
  get email(): AbstractControl { return this.signInForm.get('email'); }
  get password(): AbstractControl { return this.signInForm.get('password'); }
  get remember_me(): AbstractControl { return this.signInForm.get('remember_me'); }

  showPassword: false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public authService: AuthService,
    public rolePermissionsService: RolePermissionsService,
  ) {

    if (this.authService.isLogin()) {
      this.router.navigate(['/app']);
    }

    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember_me: []
    });
    // for the moment set remember me on true
    this.remember_me.setValue(true);

    this.signInForm.valueChanges.pipe(takeUntil(this.subscriptions)).subscribe(result => {
      this.authService.clearError();
    });

  }

  ngOnInit(): void {
  }

  public onSignInFormClick(): boolean {
    if (!this.signInForm.valid) {
      FormValidators.touchAllControls(this.signInForm);
      return false;
    }
    this.authService.login(this.signInForm.value).subscribe((loginResponse: IResponse<ILogin>) => {
      // set token
      this.authService.setToken(loginResponse.data);

      // set role
      this.rolePermissionsService.setRole('ROLE_BACK_OFFICE_USER_ADMIN');

      // redirect
      this.router.navigate(['/app']);
    }, (error: any) => {
      this.authService.httpErrorResponseHandler(error);
    });
  }

}
