import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-info',
  templateUrl: './no-info.component.html',
  styleUrls: ['./no-info.component.scss']
})
export class NoInfoComponent implements OnInit {

  @Input() title = 'No se encontró información';
  @Input() message?: string;

  constructor() { }

  ngOnInit(): void {
  }

}
