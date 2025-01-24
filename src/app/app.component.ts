import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './app.component.html',
  
})
export class  AppComponent{
  constructor(private authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
