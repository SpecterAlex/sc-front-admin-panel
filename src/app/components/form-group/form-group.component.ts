import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.scss']
})
export class FormGroupComponent implements OnInit {

  @Input() id: string;
  @Input() title: string;
  @Input() abstractControl: AbstractControl;
  @Input() required: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
