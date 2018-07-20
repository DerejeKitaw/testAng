import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'pv-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  pageTitle = 'Menu';
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }
  onLogout() {
    localStorage.removeItem('language');
    this.authService.logout();
    this.router.navigate(['/signin']);
  }

}
