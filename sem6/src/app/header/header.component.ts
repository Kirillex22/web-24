import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import {MatButton} from '@angular/material/button';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [
    MatButton,
    NgIf
  ],
  //styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(public auth: AuthService, private dialog: MatDialog) {}

  openLogin() {
    this.dialog.open(LoginComponent);
  }

  openRegister() {
    this.dialog.open(RegisterComponent);
  }

  logout() {
    this.auth.logout();
  }
}
