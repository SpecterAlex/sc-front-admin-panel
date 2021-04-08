import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AlertService {

  public changes = new BehaviorSubject<IAlert>(null);

  constructor() { }

  public delete(alertMessage: string, alertPercentage: number): void {
    const alert: IAlert = {
      message: alertMessage,
      type: AlertTypeEnum.delete,
      removing: false,
      percentage: alertPercentage,
    };
    this.changes.next(alert);
  }

  public progress(alertMessage: string, alertPercentage: number): void {
    const alert: IAlert = {
      message: alertMessage,
      type: AlertTypeEnum.progress,
      removing: false,
      percentage: alertPercentage,
    };
    this.changes.next(alert);
  }

  public warning(alertMessage: string, alertMessageDetail?: string): void {
    const alert: IAlert = {
      message: alertMessage,
      messageDetail: alertMessageDetail,
      type: AlertTypeEnum.warning,
      removing: false,
      expire: this.getExpireDate(4),
    };
    this.changes.next(alert);
  }
  public error(alertMessage: string, error?: any): void {
    localStorage.setItem('error', JSON.stringify(error));
    const alert: IAlert = {
      message: alertMessage,
      messageDetail: '',
      type: AlertTypeEnum.error,
      removing: false,
      expire: this.getExpireDate(4),
    };
    this.changes.next(alert);
  }

  public success(alertMessage: string, alertMessageDetail?: string): void {
    const alert: IAlert = {
      message: alertMessage,
      messageDetail: alertMessageDetail,
      type: AlertTypeEnum.success,
      removing: false,
      expire: this.getExpireDate(2),
    };
    this.changes.next(alert);
  }

  private getExpireDate(seconds: number = 2): moment.Moment {
    const date = moment().add(seconds, 'seconds');
    return date;
  }
}


export interface IAlert {
  type: AlertTypeEnum;
  message: string;
  messageDetail?: string;
  removing?: boolean;
  expire?: moment.Moment;
  percentage?: number;
}

export enum AlertTypeEnum {
  success = 'success',
  warning = 'warning',
  progress = 'progress',
  error = 'error',
  delete = 'delete',
}

