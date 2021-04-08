import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/core/interfaces/back-end.interface';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { AlertService } from '../../../components/alert/services/alert.service';
import { UserService } from '../service/user.service';
import { FormValidators } from 'src/app/components/form-group/helpers/form-validators';
import { PatternConstants } from 'src/app/components/form-group/helpers/pattern-constants';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IResponse } from '../../../core/interfaces/back-end.interface';
import { IConfirm, ConfirmService } from 'src/app/components/confirm/services/confirm.service';
import { FormView } from '../../../classes/form-view';

@Component({
  selector: 'app-user-create-and-update',
  templateUrl: './user-create-and-update.component.html',
  styleUrls: ['./user-create-and-update.component.scss']
})
export class UserCreateAndUpdateComponent extends FormView implements OnInit {

  userForm: FormGroup;
  get id(): AbstractControl { return this.userForm.get('id'); }
  get first_name(): AbstractControl { return this.userForm.get('first_name'); }
  get last_name(): AbstractControl { return this.userForm.get('last_name'); }
  get email(): AbstractControl { return this.userForm.get('email'); }
  get phone_number(): AbstractControl { return this.userForm.get('phone_number'); }
  get password(): AbstractControl { return this.userForm.get('password'); }

  showPassword = true;
  user: IUser;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private confirmService: ConfirmService
  ) {
    super();

    this.userForm = this.formBuilder.group({
      id: [''],
      first_name: ['', [Validators.required, FormValidators.pattern(PatternConstants.ALPHABETIC)]],
      last_name: ['', [Validators.required, FormValidators.pattern(PatternConstants.ALPHABETIC)]],
      email: ['', [Validators.required, FormValidators.pattern(PatternConstants.EMAIL)]],
      phone_number: ['', [Validators.required, FormValidators.pattern(PatternConstants.PHONE)]],
      password: ['']
    });

    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const userId: number = +paramMap.get('id');
      if (userId) {
        this.userService.getUser(userId).subscribe((userResponse: IResponse<IUser>) => {

          if (userResponse.data) {
            this.user = userResponse.data;
            this.userForm.patchValue(this.user);

            this.email.disable();
            this.password.disable();

          } else {
            this.alertService.error('No se encontro el registro en la respuesta.');
            this.router.navigate(['../../'], { relativeTo: this.activatedRoute.parent });
          }
        }, error => {
          this.alertService.error('No se encontro el registro.', error);
          this.router.navigate(['../../'], { relativeTo: this.activatedRoute.parent });
        });
      }
    });
  }

  ngOnInit(): void {
  }

  onBackClick(): void {
    if (this.id.value) {
      this.router.navigate(['../../'], { relativeTo: this.activatedRoute.parent });
    } else {
      this.router.navigate(['../'], { relativeTo: this.activatedRoute.parent });
    }
  }

  onUserFormSubmit(): void {
    if (!this.userForm.valid) {
      FormValidators.touchAllControls(this.userForm);
      this.alertService.warning('La información no es del todo correcta.');
      return;
    }
    if (this.id.value) {
      this.updateUser();
    } else {
      this.createUser();
    }
  }

  createUser(): void {
    this.busy = this.userService.createUser(this.userForm.getRawValue());
    this.busy.subscribe((userResponse: IResponse<IUser>) => {
      this.alertService.success('El registro se ha creado.');
      this.router.navigate(['../'], { relativeTo: this.activatedRoute.parent });
    }, (error: any) => {
      this.alertService.error('El registro no se ha podido crear.', error);
    });
  }

  updateUser(): void {
    const body = JSON.parse(JSON.stringify(this.userForm.getRawValue()));
    delete body.password;
    this.busy = this.userService.updateUser(this.id.value, body);
    this.busy.subscribe((userResponse: IResponse<IUser>) => {
      this.alertService.success('El registro se ha actualizado.');
      this.router.navigate(['../../'], { relativeTo: this.activatedRoute.parent });
    }, (error: any) => {
      this.alertService.error('El registro no se ha podido actualizar.', error);
    });
  }

  onDeleteUser(): void {
    const confirmConfig: IConfirm = {
      title: '¿Deseas eliminar el usuario?',
      message: '',
      accept: () => {
        this.busyDelete = this.userService.deleteUser(this.id.value);
        this.busyDelete.subscribe((userResponse: IResponse<IUser>) => {
          this.alertService.success('El registro se ha eliminado.');
          this.router.navigate(['../../'], { relativeTo: this.activatedRoute.parent });
        }, (error: any) => {
          this.alertService.error('El registro no se ha podido eliminar.', error);
        });
      }
    };
    this.confirmService.confirm(confirmConfig);
  }

}
