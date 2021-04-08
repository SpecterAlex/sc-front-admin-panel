import { Component, OnInit } from '@angular/core';
import { ListView } from '../../../classes/list-view';

@Component({
  selector: 'app-production-order-list',
  templateUrl: './production-order-list.component.html',
  styleUrls: ['./production-order-list.component.scss']
})
export class ProductionOrderListComponent extends ListView<any> implements OnInit {

  constructor() {
    super('production-order-list');
  }

  ngOnInit(): void {
  }

}
