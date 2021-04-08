import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

declare const $;

@Component({
  selector: 'app-table-pagination',
  templateUrl: './table-pagination.component.html',
  styleUrls: ['./table-pagination.component.scss']
})

export class TablePaginationComponent implements OnChanges {

  @Input() totalElements: number;
  @Input() page = 1;
  @Input() size = 15;

  public changes = new BehaviorSubject(null);

  constructor() {
    this.changes.next({ page: this.page, size: this.size });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.totalElements.currentValue || changes.totalElements.currentValue === 0) {
      this.config();
    }
  }

  private config(): void {
    const dataSource = Array.from(Array(this.totalElements).keys());
    const container = $('#pagination');
    const options = {
      dataSource: dataSource,
      pageNumber: this.page,
      afterPaging: (page) => this.afterPaging(page),
      prevText: '',
      nextText: '',
    };
    container.pagination(options);
  }

  public afterPaging(page): void {
    if (this.page !== page) {
      this.page = page;
      this.changes.next({ page: page, size: this.size });
    }
  }

}
