import { Component, Input, OnInit } from '@angular/core';
import { INavLink } from 'src/app/core/interfaces/back-end.interface';

declare const $;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() logoSrc?: string;
  @Input() sideBarLinks: INavLink[];


  constructor() { }

  ngOnInit(): void {
  }

  onHideOrShowSidebar(): void {
    $('.sidebar').toggleClass('toggled');
    if ($('.sidebar').hasClass('toggled')) {
      $('.sidebar .collapse').collapse('hide');
    }
  }
}
