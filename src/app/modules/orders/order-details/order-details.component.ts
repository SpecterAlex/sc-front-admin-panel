import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/components/alert/services/alert.service';
import { CoreService } from '../../../core/services/core.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    private coreService: CoreService
  ) { }

  ngOnInit(): void {
  }

  onBackClick(): void {
    this.router.navigate(['../../'], { relativeTo: this.activatedRoute.parent });
  }

}
