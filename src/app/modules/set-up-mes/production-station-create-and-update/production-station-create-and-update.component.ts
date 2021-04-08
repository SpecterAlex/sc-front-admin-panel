import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AlertService } from 'src/app/components/alert/services/alert.service';
import { ConfirmService, IConfirm } from 'src/app/components/confirm/services/confirm.service';
import { FormView } from '../../../classes/form-view';
import { SetUpMesService } from '../service/set-up-mes.service';
import { IProductionStation, IResponse } from '../../../core/interfaces/back-end.interface';
import { FormValidators } from 'src/app/components/form-group/helpers/form-validators';

declare const $;

@Component({
  selector: 'app-production-station-create-and-update',
  templateUrl: './production-station-create-and-update.component.html',
  styleUrls: ['./production-station-create-and-update.component.scss']
})
export class ProductionStationCreateAndUpdateComponent extends FormView implements OnInit {

  @Output() productionStation = new EventEmitter<boolean>();

  productionStationForm: FormGroup;
  get id(): AbstractControl { return this.productionStationForm.get('id'); }
  get name(): AbstractControl { return this.productionStationForm.get('name'); }
  get code(): AbstractControl { return this.productionStationForm.get('code'); }
  get production_line_id(): AbstractControl { return this.productionStationForm.get('production_line_id'); }
  get capacity_per_hour(): AbstractControl { return this.productionStationForm.get('capacity_per_hour'); }

  productionLines = [
    { id: 1, name: 'Prueba 1' },
    { id: 1, name: 'Prueba 2' },
    { id: 1, name: 'Prueba 3' },
    { id: 1, name: 'Prueba 4' },
    { id: 1, name: 'Prueba 5' },
  ];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    private confirmService: ConfirmService,
    private setUpMesService: SetUpMesService,
    private formBuilder: FormBuilder
  ) {
    super();

    this.productionStationForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      code: ['', [Validators.required]],
      production_line_id: ['', [Validators.required]],
      capacity_per_hour: ['', [Validators.required]]
    });

  }

  ngOnInit(): void {
  }

  setProductionStation(productionStationId: number): void {
    if (productionStationId) {
      this.setUpMesService.getProductionStation(productionStationId).subscribe((productionStationResponse: IResponse<IProductionStation>) => {
        if (productionStationResponse.data) {
          this.productionStationForm.patchValue(productionStationResponse.data);
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

  onProductionStationFormSubmit(): void {
    if (!this.productionStationForm.valid) {
      FormValidators.touchAllControls(this.productionStationForm);
      this.alertService.warning('La información no es del todo correcta.');
      return;
    }
    if (this.id.value) {
      this.updateProductionStation();
    } else {
      this.createProductionStation();
    }
  }

  createProductionStation(): void {
    const body = JSON.parse(JSON.stringify(this.productionStationForm.getRawValue()));
    delete body.id;

    this.busy = this.setUpMesService.createProductionStation(body);
    this.busy.subscribe((pproductionStationResponse: IResponse<IProductionStation>) => {
      this.alertService.success('El registro se ha creado.');
      this.onBackClick();
      this.productionStation.emit(true);
    }, (error: any) => {
      this.alertService.error('El registro no se ha podido crear.', error);
    });
  }

  updateProductionStation(): void {
    this.busy = this.setUpMesService.updateProductionStation(this.id.value, this.productionStationForm.getRawValue());
    this.busy.subscribe((productionStationResponse: IResponse<IProductionStation>) => {
      this.alertService.success('El registro se ha actualizado.');
      this.onBackClick();
      this.productionStation.emit(true);
    }, (error: any) => {
      this.alertService.error('El registro no se ha podido actualizar.', error);
    });
  }

  onBackClick(): void {
    this.cleanForm();
    $('#modalProductionStationCreateAndUpdate').modal('hide');
  }

  onCreateProductionStation(): void {
    $('#modalProductionStationCreateAndUpdate').modal('show');
  }

  onUpdateProductionStation(productionStionId: number): void {
    this.setProductionStation(productionStionId);
    $('#modalProductionStationCreateAndUpdate').modal('show');
  }

  cleanForm(): void {
    this.productionStationForm.reset();
    this.productionStationForm.clearValidators();
  }

}
