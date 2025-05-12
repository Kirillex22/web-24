import { Component } from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import {MatFormField, MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    MatInput,
    MatFormField,
    FormsModule,
    NgIf,
    MatDialogActions,
    MatButton
  ],
  //styleUrl: './register.component.css'
})
export class RegisterComponent {
  login = '';
  password1 = '';
  password2 = '';
  error = '';

  constructor(public dialogRef: MatDialogRef<RegisterComponent>, private auth: AuthService) {}

  submit() {
    if (this.password1 !== this.password2) {
      this.error = 'Пароли не совпадают';
      return;
    }

    const success = this.auth.register(this.login, this.password1);
    if (!success) {
      this.error = 'Пользователь уже существует';
    } else {
      this.dialogRef.close();
    }
  }
}
