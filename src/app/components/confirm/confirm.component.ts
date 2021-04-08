import { Component, OnInit } from '@angular/core';
import { ConfirmService, IConfirm, IAccept } from './services/confirm.service';

declare const $;

@Component({
	selector: 'app-confirm',
	templateUrl: './confirm.component.html',
	styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
	public config: IConfirm | IAccept;

	constructor(
		private confirmService: ConfirmService
	) {
		this.confirmService.onConfirm.subscribe((config: IConfirm) => {
			this.config = config;
			$('#modalConfirm').modal('show');
		});

		this.confirmService.onAccept.subscribe((config: IAccept) => {
			this.config = config;
			$('#modalAccept').modal('show');
		});
	}

	ngOnInit() {
	}

	public onAcceptClick() {
		(this.config as IConfirm).accept();
		$('#modalConfirm').modal('hide');
	}

	public onCancelClick() {
		if ((this.config as IConfirm).cancel) {
			(this.config as IConfirm).cancel();
		}
		$('#modalConfirm').modal('hide');
	}

	public onOkClick() {
		if ((this.config as IAccept).ok) {
			(this.config as IAccept).ok();
		}
		$('#modalAccept').modal('hide');
	}
}

// modalAccept


