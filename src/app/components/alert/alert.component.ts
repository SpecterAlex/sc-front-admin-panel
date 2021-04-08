import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertService, IAlert } from './services/alert.service';
import * as moment from 'moment';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {

  public alerts: IAlert[] = [];
  public timerCleaner;
  public pause = false;

  constructor(
    private alertService: AlertService,
  ) {
    this.alertService.changes.subscribe((alert: IAlert) => {
      if (!alert) {
        return false;
      }

      if (this.alerts.length === 0 && this.timerCleaner === undefined) {
        this.startTimerCleaner();
      }

      const alertFound = this.alerts.find((findAlert: IAlert) =>
      findAlert.message === alert.message &&
      findAlert.messageDetail === alert.messageDetail &&
      findAlert.removing === false
      );

      if (alertFound) {
        alertFound.expire = alert.expire;
        alertFound.percentage = alert.percentage;
      } else {
        this.alerts.push(alert);
      }
    });
  }

  ngOnInit(): void {
  }

  public onAlertClick(alert): void {
    this.removeAlert(alert);
    this.pause = false;
  }

  private startTimerCleaner(): void {
    this.timerCleaner = setInterval(() => {
      if (!this.pause) {
        for (const alert of this.alerts) {
          if (moment().isAfter(alert.expire) && !alert.removing || alert.percentage === 100) {
            alert.removing = true;
            setTimeout(() => {
              this.removeAlert(alert);
            }, 1100);
          }
        }
      }
    }, 1000);
  }

  private removeAlert(alert): void {
    const index = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
    if (this.alerts.length === 0 && this.timerCleaner) {
      clearInterval(this.timerCleaner);
      this.timerCleaner = undefined;
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.timerCleaner);
  }
}
