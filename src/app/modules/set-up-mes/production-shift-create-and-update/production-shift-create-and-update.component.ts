import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AlertService } from '../../../components/alert/services/alert.service';
import { SetUpMesService } from '../service/set-up-mes.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormView } from '../../../classes/form-view';
import { IProductionShift, IResponse } from 'src/app/core/interfaces/back-end.interface';
import { FormValidators } from 'src/app/components/form-group/helpers/form-validators';

declare const $;

@Component({
  selector: 'app-production-shift-create-and-update',
  templateUrl: './production-shift-create-and-update.component.html',
  styleUrls: ['./production-shift-create-and-update.component.scss']
})
export class ProductionShiftCreateAndUpdateComponent extends FormView implements OnInit {

  @Output() productionShift = new EventEmitter<boolean>();

  productionShiftForm: FormGroup;
  get id(): AbstractControl { return this.productionShiftForm.get('id'); }
  get name(): AbstractControl { return this.productionShiftForm.get('name'); }
  get code(): AbstractControl { return this.productionShiftForm.get('code'); }
  get description(): AbstractControl { return this.productionShiftForm.get('description'); }
  get total_hours(): AbstractControl { return this.productionShiftForm.get('total_hours'); }


  constructor(
    private alertService: AlertService,
    private setUpMesService: SetUpMesService,
    private formBuilder: FormBuilder,
  ) {
    super();

    this.productionShiftForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      code: ['', [Validators.required]],
      description: ['', [Validators.required]],
      total_hours: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  setProductionShift(shiftId: number): void {
    if (shiftId) {
      this.setUpMesService.getProductionShift(shiftId).subscribe((productionShiftResponse: IResponse<IProductionShift>) => {
        if (productionShiftResponse.data) {
          this.productionShiftForm.patchValue(productionShiftResponse.data);
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

  createProductionShift(): void {
    const body = JSON.parse(JSON.stringify(this.productionShiftForm.getRawValue()));
    delete body.id;

    this.busy = this.setUpMesService.createProductionShift(body);
    this.busy.subscribe((pproductionShiftResponse: IResponse<IProductionShift>) => {
      this.alertService.success('El registro se ha creado.');
      this.onBackClick();
      this.productionShift.emit(true);
    }, (error: any) => {
      this.alertService.error('El registro no se ha podido crear.', error);
    });
  }

  updateProductionShift(): void {
    this.busy = this.setUpMesService.updateProductionShift(this.id.value, this.productionShiftForm.getRawValue());
    this.busy.subscribe((pproductionShiftResponse: IResponse<IProductionShift>) => {
      this.alertService.success('El registro se ha actualizado.');
      this.onBackClick();
      this.productionShift.emit(true);
    }, (error: any) => {
      this.alertService.error('El registro no se ha podido actualizar.', error);
    });
  }

  onProductionShiftSubmit(): void {
    if (!this.productionShiftForm.valid) {
      FormValidators.touchAllControls(this.productionShiftForm);
      this.alertService.warning('La información no es del todo correcta.');
      return;
    }
    if (this.id.value) {
      this.updateProductionShift();
    } else {
      this.createProductionShift();
    }
  }

  onBackClick(): void {
    this.cleanForm();
    $('#modalProductionShiftCreateAndUpdate').modal('hide');
  }
  onCreateProductionShift(): void {
    $('#modalProductionShiftCreateAndUpdate').modal('show');
  }

  onUpdateProductionShit(shiftId: number): void {
    this.setProductionShift(shiftId);
    $('#modalProductionShiftCreateAndUpdate').modal('show');
  }

  cleanForm(): void {
    this.productionShiftForm.reset();
    this.productionShiftForm.clearValidators();
  }
}
