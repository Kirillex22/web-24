import { Component } from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatInput} from '@angular/material/input';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    MatFormField,
    FormsModule,
    MatDialogActions,
    MatButton,
    MatDialogContent,
    MatDialogTitle,
    MatInput,
    MatFormField,
    NgIf
  ],
  //styleUrl: './login.component.css'
})
export class LoginComponent {
  login = '';
  password = '';
  error = false;

  constructor(public dialogRef: MatDialogRef<LoginComponent>, private auth: AuthService) {}

  submit() {
    const success = this.auth.login(this.login, this.password);
    this.error = !success;
    if (success) this.dialogRef.close();
  }
}
