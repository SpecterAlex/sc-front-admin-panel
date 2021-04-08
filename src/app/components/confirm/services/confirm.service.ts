import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable, ReplaySubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ConfirmService {
	public onConfirm = new Subject<IConfirm>();
	public onAccept = new Subject<IAccept>();

	constructor() {
	}

	public confirm(config: { title, message, accept, cancel?}) {
		this.onConfirm.next(config)
	}

	public accept(config: { title, message?, ok?}) {
		this.onAccept.next(config)
	}
}

export interface IConfirm {
	title: string;
	message: string;
	accept: IFn;
	cancel?: IFn;
}

export interface IAccept {
	title: string;
	message?: string;
	ok?: IFn;
}
export interface IFn {
	(): void;
}