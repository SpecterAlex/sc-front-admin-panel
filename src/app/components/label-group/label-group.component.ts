import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-label-group',
  templateUrl: './label-group.component.html',
  styleUrls: ['./label-group.component.scss']
})
export class LabelGroupComponent implements OnInit {

  @Input() title: string;
  @Input() message: string;

  constructor() { }

  ngOnInit(): void {
  }

}
