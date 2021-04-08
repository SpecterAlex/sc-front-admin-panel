import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmComponent } from './confirm.component';
import { ConfirmService } from './services/confirm.service';

@NgModule({
	declarations: [ConfirmComponent],
	imports: [
		CommonModule
	],
	exports: [
		ConfirmComponent,
	],
	// providers: [
	// 	ConfirmService,
	// ]
})
export class ConfirmModule { }
