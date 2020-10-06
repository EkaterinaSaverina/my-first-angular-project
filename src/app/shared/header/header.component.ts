import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../core/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  logOut(): void {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }
}
