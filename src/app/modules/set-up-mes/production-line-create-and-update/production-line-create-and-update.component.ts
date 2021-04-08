import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormView } from '../../../classes/form-view';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AlertService } from '../../../components/alert/services/alert.service';
import { ConfirmService, IConfirm } from '../../../components/confirm/services/confirm.service';
import { SetUpMesService } from '../service/set-up-mes.service';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { IProductionLine, IResponse } from 'src/app/core/interfaces/back-end.interface';
import { FormValidators } from 'src/app/components/form-group/helpers/form-validators';

declare const $;
@Component({
  selector: 'app-production-line-create-and-update',
  templateUrl: './production-line-create-and-update.component.html',
  styleUrls: ['./production-line-create-and-update.component.scss']
})
export class ProductionLineCreateAndUpdateComponent extends FormView implements OnInit {

  @Output() productionLine = new EventEmitter<boolean>();

  productionLineForm: FormGroup;
  get id(): AbstractControl { return this.productionLineForm.get('id'); }
  get name(): AbstractControl { return this.productionLineForm.get('name'); }
  get code(): AbstractControl { return this.productionLineForm.get('code'); }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    private confirmService: ConfirmService,
    private setUpMesService: SetUpMesService,
    private formBuilder: FormBuilder
  ) {
    super();

    this.productionLineForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      code: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  setProductionLine(productionLineId: number): void {
    if (productionLineId) {
      this.setUpMesService.getProductionLine(productionLineId).subscribe((productionLineResponse: IResponse<IProductionLine>) => {
        if (productionLineResponse.data) {
          this.productionLineForm.patchValue(productionLineResponse.data);
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

  onProductionLineFormSubmit(): void {
    if (!this.productionLineForm.valid) {
      FormValidators.touchAllControls(this.productionLineForm);
      this.alertService.warning('La información no es del todo correcta.');
      return;
    }
    if (this.id.value) {
      this.updateProductionLine();
    } else {
      this.createProductionLine();
    }
  }

  createProductionLine(): void {
    const body = JSON.parse(JSON.stringify(this.productionLineForm.getRawValue()));
    delete body.id;

    this.busy = this.setUpMesService.createProductionLine(body);
    this.busy.subscribe((pproductionLineResponse: IResponse<IProductionLine>) => {
      this.alertService.success('El registro se ha creado.');
      this.onBackClick();
      this.productionLine.emit(true);
    }, (error: any) => {
      this.alertService.error('El registro no se ha podido crear.', error);
    });
  }

  updateProductionLine(): void {
    this.busy = this.setUpMesService.updateProductionLine(this.id.value, this.productionLineForm.getRawValue());
    this.busy.subscribe((productionLineResponse: IResponse<IProductionLine>) => {
      this.alertService.success('El registro se ha actualizado.');
      this.onBackClick();
      this.productionLine.emit(true);
    }, (error: any) => {
      this.alertService.error('El registro no se ha podido actualizar.', error);
    });
  }

  onBackClick(): void {
    this.cleanForm();
    $('#modalProductionLineCreateAndUpdate').modal('hide');
  }

  onCreateProductionLine(): void {
    $('#modalProductionLineCreateAndUpdate').modal('show');
  }

  onEditProductionLine(productionLineId: number): void {
    this.setProductionLine(productionLineId);
    $('#modalProductionLineCreateAndUpdate').modal('show');
  }

  cleanForm(): void {
    this.productionLineForm.reset();
    this.productionLineForm.clearValidators();
  }

}
