import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { INavLink } from 'src/app/core/interfaces/back-end.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() profileImage = 'assets/icons/undraw_profile.svg';
  @Input() navLinks: INavLink[];
  @Input() nameUser = 'Pruebas SC';


  // event logOut
  @Output() logout = new EventEmitter<boolean>();
  @Output() sidebarAction = new EventEmitter<boolean>();


  constructor() { }

  ngOnInit(): void {
  }

  onLogoutClick(): void {
    this.logout.emit(true);
  }

  onSidebarActionClick(): void {
    this.sidebarAction.emit(true);
  }

}
