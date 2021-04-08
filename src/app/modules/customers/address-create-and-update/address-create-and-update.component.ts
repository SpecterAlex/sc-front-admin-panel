import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormView } from 'src/app/classes/form-view';
import { AlertService } from 'src/app/components/alert/services/alert.service';
import { IAddress, IZipCode } from 'src/app/core/interfaces/back-end.interface';
import { ISuburb, IResponse } from '../../../core/interfaces/back-end.interface';
import { CustomerService } from '../service/customer.service';
import { HttpErrorResponse } from '@angular/common/http';

declare const $;

@Component({
  selector: 'app-address-create-and-update',
  templateUrl: './address-create-and-update.component.html',
  styleUrls: ['./address-create-and-update.component.scss']
})
export class AddressCreateAndUpdateComponent extends FormView implements OnInit {


  @Output() save = new EventEmitter<IAddress>();

  addressForm: FormGroup;
  get id(): AbstractControl { return this.addressForm.get('id'); }
  get street(): AbstractControl { return this.addressForm.get('street'); }
  get zip_code(): AbstractControl { return this.addressForm.get('zip_code'); }
  get number(): AbstractControl { return this.addressForm.get('number'); }
  get suburb_id(): AbstractControl { return this.addressForm.get('suburb_id'); }
  get phone_number(): AbstractControl { return this.addressForm.get('phone_number'); }
  get customer_id(): AbstractControl { return this.addressForm.get('customer_id'); }
  get invoice(): AbstractControl { return this.addressForm.get('invoice'); }

  suburbs: ISuburb[];
  address: IAddress;

  disabledD = true;

  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
  ) {
    super();

    this.suburbs = [];

    this.addressForm = this.formBuilder.group({
      id: [''],
      street: ['', [Validators.required]],
      number: ['', [Validators.required]],
      zip_code: ['', [Validators.required]],
      suburb_id: ['', [Validators.required]],
      phone_number: [''],
      customer_id: [''],
      invoice: ['', [Validators.required]]
    });

    this.suburb_id.disable();

    this.zip_code.valueChanges.subscribe(zipCode => {
      if (zipCode && zipCode.length === 5) {
        this.customerService.getSuburbs(zipCode).subscribe((suburbsResponse: IResponse<IZipCode>) => {
          this.suburbs = suburbsResponse.data.suburbs;
          this.suburb_id.enable();
        }, (error: HttpErrorResponse) => {
          this.suburbs = [];
          this.suburb_id.disable();
          this.zip_code.setErrors({
            invalidPattern: 'Código postal invalido.'
          });
        });
      }
    });
  }

  ngOnInit(): void {
  }

  setAddress(addressId): void {
    if (addressId) {
      this.customerService.getAddress(addressId).subscribe((addressResponse: IResponse<IAddress>) => {
        if (addressResponse.data) {
          this.address = addressResponse.data;

          this.address.invoice = addressResponse.data.invoice ? true : false;
          this.address.zip_code = addressResponse.data.suburb.zipcode.zipcode;

          this.addressForm.patchValue(addressResponse.data);
          this.suburb_id.enable();

        } else {
          this.alertService.error('No se encontro el registro en la respuesta.');
          this.onBackClick();
        }
      }, error => {
        this.alertService.error('No se encontro el registro.', error);
        this.onBackClick();
      });
    }
  }

  onBackClick(): void {
    this.cleanForm();
    $('#modalAddressCreateAndUpdate').modal('hide');
  }

  onCreateAddress(): void {
    $('#modalAddressCreateAndUpdate').modal('show');
  }

  onUpdateAddress(addressId: number): void {
    this.setAddress(addressId);
    $('#modalAddressCreateAndUpdate').modal('show');
  }

  onAddressFormSubmit(): void {
    const address = this.addressForm.getRawValue();

    if (this.id.value) {
      address._edit = true;
    } else {
      address.id = 0;
    }

    this.save.emit(address);
    this.onBackClick();
  }

  cleanForm(): void {
    this.addressForm.reset();
    this.addressForm.clearValidators();
    this.suburbs = [];
    this.suburb_id.disable();
  }

}
