import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-consolidation',
  templateUrl: './order-consolidation.component.html',
  styleUrls: ['./order-consolidation.component.scss']
})
export class OrderConsolidationComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  onBackClick(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute.parent });
  }

}
