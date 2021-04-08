import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/components/alert/services/alert.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormValidators } from 'src/app/components/form-group/helpers/form-validators';
import { PatternConstants } from 'src/app/components/form-group/helpers/pattern-constants';
import { CustomerService } from '../service/customer.service';
import { ICustomer } from 'src/app/core/interfaces/back-end.interface';
import { IResponse, IAddress } from '../../../core/interfaces/back-end.interface';
import { ConfirmService, IConfirm } from 'src/app/components/confirm/services/confirm.service';
import { AddressCreateAndUpdateComponent } from '../address-create-and-update/address-create-and-update.component';
import { FormView } from 'src/app/classes/form-view';
import { from } from 'rxjs';
import { concatAll } from 'rxjs/operators';


@Component({
  selector: 'app-customer-create-and-update',
  templateUrl: './customer-create-and-update.component.html',
  styleUrls: ['./customer-create-and-update.component.scss']
})
export class CustomerCreateAndUpdateComponent extends FormView implements OnInit {

  customerForm: FormGroup;
  get id(): AbstractControl { return this.customerForm.get('id'); }
  get name(): AbstractControl { return this.customerForm.get('name'); }
  get rfc(): AbstractControl { return this.customerForm.get('rfc'); }
  get email(): AbstractControl { return this.customerForm.get('email'); }
  get phone_number(): AbstractControl { return this.customerForm.get('phone_number'); }
  get contact_name(): AbstractControl { return this.customerForm.get('contact_name'); }
  get contact_number(): AbstractControl { return this.customerForm.get('contact_number'); }

  customer: ICustomer;
  addresses: IAddress[] = [];
  addressesCreateUpdate: IAddress[] = [];

  @ViewChild(AddressCreateAndUpdateComponent) addressComponent: AddressCreateAndUpdateComponent;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    private confirmService: ConfirmService
  ) {
    super();

    this.customerForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required, FormValidators.pattern(PatternConstants.ALPHABETIC)]],
      rfc: [''],
      email: ['', [Validators.required, FormValidators.pattern(PatternConstants.EMAIL)]],
      phone_number: ['', [Validators.required, FormValidators.pattern(PatternConstants.PHONE)]],
      contact_name: ['', [FormValidators.pattern(PatternConstants.ALPHABETIC)]],
      contact_number: ['', [FormValidators.pattern(PatternConstants.PHONE)]],
    });

    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const customerId: number = +paramMap.get('id');
      if (customerId) {
        this.customerService.getCustomer(customerId).subscribe((customerResponse: IResponse<ICustomer>) => {
          if (customerResponse.data) {
            this.customer = customerResponse.data;
            this.addresses = customerResponse.data.addresses;
            this.customerForm.patchValue(this.customer);
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

  onCustomerFormSubmit(): void {
    if (!this.customerForm.valid) {
      FormValidators.touchAllControls(this.customerForm);
      this.alertService.warning('La información no es del todo correcta.');
      return;
    }
    if (this.id.value) {
      this.updateCustomer();
    } else {
      this.createCustomer();
    }
  }

  createCustomer(): void {
    const body = JSON.parse(JSON.stringify(this.customerForm.getRawValue()));
    delete body.id;

    this.busy = this.customerService.createCustomer(body);
    this.busy.subscribe((customerResponse: IResponse<ICustomer>) => {
      if (this.addressesCreateUpdate.length > 0) {
        let uploadedAddress = 0;
        this.busy = this.onAddressCreateUpdate(customerResponse.data.id);
        this.busy.subscribe(data => {
          if (data.data) {
            uploadedAddress++;
            if (uploadedAddress === this.addressesCreateUpdate.length) {
              this.alertService.success('El registro se ha creado.');
              this.onBackClick();
            }
          }
        }, (error) => {
          this.alertService.error('El registro se ha creado, pero hubo un detalle con las direcciones.', error);
          this.router.navigate(['../../'], { relativeTo: this.activatedRoute.parent });
        });
      } else {
        this.alertService.success('El registro se ha creado.');
        this.onBackClick();
      }
    }, (error: any) => {
      this.alertService.error('El registro no se ha podido crear.', error);
    });
  }

  updateCustomer(): void {
    this.busy = this.customerService.updateCustomer(this.id.value, this.customerForm.getRawValue());
    this.busy.subscribe((customerResponse: IResponse<ICustomer>) => {
      if (this.addressesCreateUpdate.length > 0) {
        let uploadedAddress = 0;
        this.busy = this.onAddressCreateUpdate(this.id.value);
        this.busy.subscribe(data => {
          if (data.data) {
            uploadedAddress++;
            if (uploadedAddress === this.addressesCreateUpdate.length) {
              this.alertService.success('El registro se ha creado.');
              this.onBackClick();
            }
          }
        }, (error) => {
          this.alertService.error('El registro se ha actualizado, pero hubo un detalle con las direcciones.', error);
          this.router.navigate(['../../'], { relativeTo: this.activatedRoute.parent });
        });
      } else {
        this.alertService.success('El registro se ha actualizado.');
        this.onBackClick();
      }
    }, (error: any) => {
      this.alertService.error('El registro no se ha podido actualizar.', error);
    });
  }

  onDeleteCustomer(): void {
    const confirmConfig: IConfirm = {
      title: '¿Deseas eliminar el cliente?',
      message: '',
      accept: () => {
        this.busyDelete = this.customerService.deleteCustomer(this.id.value);
        this.busyDelete.subscribe((customerResponse: IResponse<ICustomer>) => {
          this.alertService.success('El registro se ha eliminado.');
          this.onBackClick();
        }, (error: any) => {
          this.alertService.error('El registro no se ha podido eliminar.', error);
        });
      }
    };
    this.confirmService.confirm(confirmConfig);
  }

  onCreateAddress(): void {
    this.addressComponent.onCreateAddress();
  }

  onUpdateAddress(addressId: number): void {
    this.addressComponent.onUpdateAddress(addressId);
  }

  onAddressChange($event: IAddress): void {
    if ($event.id !== 0) {
      const addressFind = this.addresses.find(address => address.id === $event.id);
      if (addressFind) {
        addressFind.invoice = $event.invoice;
        addressFind.number = $event.number;
        addressFind.street = $event.street;
      } else {
        this.addresses.push($event);
      }
    } else {
      this.addresses.push($event);
    }
    this.addressesCreateUpdate.push($event);
  }

  private onAddressCreateUpdate(customerId): any {
    const obsevableAddress: any[] = [];
    for (const address of this.addressesCreateUpdate) {
      if (address._edit) {
        const bodyAddress = {
          id: address.id,
          street: address.street,
          number: address.number,
          suburb_id: address.suburb_id,
          phone_number: address.phone_number,
          customer_id: customerId,
          invoice: address.invoice
        };
        obsevableAddress.push(this.customerService.updateAddress(address.id, bodyAddress));
      } else {
        const bodyAddress = {
          street: address.street,
          number: address.number,
          suburb_id: address.suburb_id,
          phone_number: address.phone_number,
          customer_id: customerId,
          invoice: address.invoice
        };
        obsevableAddress.push(this.customerService.createAddress(bodyAddress));
      }
    }
    return from(obsevableAddress).pipe(concatAll());
  }
}
