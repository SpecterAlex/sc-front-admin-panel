import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { AlertService } from 'src/app/components/alert/services/alert.service';
import { ProductService } from '../service/product.service';
import { IProduct, IResponse } from '../../../core/interfaces/back-end.interface';
import { FormView } from '../../../classes/form-view';
import { FormValidators } from 'src/app/components/form-group/helpers/form-validators';
import { IConfirm } from '../../../components/confirm/services/confirm.service';
import { ConfirmService } from 'src/app/components/confirm/services/confirm.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpEventType } from '@angular/common/http';
import { PathConstants } from '../../../core/path-constants/path-constants';
import { PatternConstants } from 'src/app/components/form-group/helpers/pattern-constants';

@Component({
  selector: 'app-product-create-and-update',
  templateUrl: './product-create-and-update.component.html',
  styleUrls: ['./product-create-and-update.component.scss']
})
export class ProductCreateAndUpdateComponent extends FormView implements OnInit {

  productForm: FormGroup;
  get id(): AbstractControl { return this.productForm.get('id'); }
  get name(): AbstractControl { return this.productForm.get('name'); }
  get description(): AbstractControl { return this.productForm.get('description'); }
  get price(): AbstractControl { return this.productForm.get('price'); }
  get url_image(): AbstractControl { return this.productForm.get('url_image'); }
  get volume(): AbstractControl { return this.productForm.get('volume'); }

  private imageSettings = {
    imageType: 'PNG',
    size: 2048
  };

  isImageChange = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private confirmService: ConfirmService,
    private domSanitizer: DomSanitizer
  ) {
    super();

    this.productForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required, FormValidators.pattern(PatternConstants.ONLY_NUMBERS)]],
      url_image: ['', [Validators.required]],
      volume: ['', [Validators.required, FormValidators.pattern(PatternConstants.ONLY_NUMBERS)]],
    });

    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const productId: number = +paramMap.get('id');
      if (productId) {
        this.productService.getProduct(productId).subscribe((productResponse: IResponse<IProduct>) => {
          if (productResponse.data) {
            this.productForm.patchValue(productResponse.data);
            if (productResponse.data.url_image != null && productResponse.data.url_image !== '') {
              this.url_image.setValue({
                srcName: productResponse.data.url_image,
                url: PathConstants.getPathPublic(productResponse.data.url_image)
              });
            }
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

  onProductFormSubmit(): void {
    if (!this.productForm.valid) {
      FormValidators.touchAllControls(this.productForm);
      this.alertService.warning('La información no es del todo correcta.');
      return;
    }
    if (this.id.value) {
      this.updateProduct();
    } else {
      this.createProduct();
    }
  }

  createProduct(): void {
    const formData = new FormData();
    if (this.url_image.value) {
      formData.append('url_image', this.url_image.value.file);
    } else {
      formData.append('url_image', '');
    }
    formData.append('name', this.name.value);
    formData.append('description', this.description.value);
    formData.append('volume', this.volume.value);
    formData.append('price', this.price.value);
    this.busy = this.productService.createProduct(formData);
    this.busy.subscribe((data: any) => {
      if (data.type === HttpEventType.UploadProgress && data.loaded && data.total) {
        this.alertService.progress('Subiendo imagen ', Math.round((data.loaded / data.total) * 100));
      }
      else if (data.body) {
        this.alertService.success('El registro se ha creado.');
        this.onBackClick();
      }
    }, (error: any) => {
      this.alertService.error('El registro no se ha podido crear.', error);
    });
  }

  updateProduct(): void {
    const formData = new FormData();
    if (this.isImageChange) {
      formData.append('url_image', this.url_image.value.file);
    }
    else {
      formData.append('url_image', this.url_image.value.srcName);
    }
    formData.append('id', this.id.value);
    formData.append('name', this.name.value);
    formData.append('description', this.description.value);
    formData.append('volume', this.volume.value);
    formData.append('price', this.price.value);
    formData.append('_method', 'PUT');

    this.busy = this.productService.updateProduct(this.id.value, formData);
    this.busy.subscribe((data: any) => {
      if (data.type === HttpEventType.UploadProgress && data.loaded && data.total) {
        if (this.isImageChange) {
          this.alertService.progress('Subiendo imagen ', Math.round((data.loaded / data.total) * 100));
        }
      }
      else if (data.body) {
        this.alertService.success('El registro se ha actualizado.');
        this.onBackClick();
      }
    }, (error: any) => {
      this.alertService.error('El registro no se ha podido actualizar.', error);
    });
  }

  onDeleteProduct(): void {
    const confirmConfig: IConfirm = {
      title: '¿Deseas eliminar el producto?',
      message: '',
      accept: () => {
        this.busyDelete = this.productService.deleteProduct(this.id.value);
        this.busyDelete.subscribe((productResponse: IResponse<IProduct>) => {
          this.alertService.success('El registro se ha eliminado.');
          this.onBackClick();
        }, (error: any) => {
          this.alertService.error('El registro no se ha podido eliminar.', error);
        });
      }
    };
    this.confirmService.confirm(confirmConfig);
  }

  public onImageDelete(): void {
    this.isImageChange = true;
    this.url_image.setValue(null);
  }

  public onFileUploaderChanges($event): void {
    const fileList: File[] = $event.target.files;
    if (fileList.length > 0) {
      const filex = fileList[0];
      if (this.validateImage(filex)) {
        const blob = new Blob([filex]);
        this.url_image.setValue({
          name: filex.name,
          file: filex,
          url: this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob)),
        });
        this.isImageChange = true;
        $event.srcElement.value = null;
      }
    }
  }

  private validateImage(file: File): boolean {
    const fileSize = file.size / 1024;
    let success = true;

    if (!(/\.(jpe?g|png|gif|bmp)$/i).test(file.name)) {
      this.alertService.error('El archivo no tiene la extensión adecuada.');
      success = false;
    } else if (fileSize > this.imageSettings.size) {
      this.alertService.error('El archivo no debe superar los 5MB');
      success = false;
    }

    return success;
  }

}
