import { Injectable } from '@angular/core';
import { MessageService } from './message.service';

export interface User {
  login: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserKey = 'currentUser';
  private usersKey = 'users';

  constructor(private messageService: MessageService) {}

  get currentUser(): string | null {
    return localStorage.getItem(this.currentUserKey);
  }

  isAuthenticated(): boolean {
    return !!this.currentUser;
  }

  login(login: string, password: string): boolean {
    const users: User[] = JSON.parse(localStorage.getItem(this.usersKey) || '[]');
    const user = users.find(u => u.login === login && u.password === password);
    if (user) {
      localStorage.setItem(this.currentUserKey, login);
      this.messageService.add(`Пользователь "${login}" успешно вошёл.`);
      return true;
    }
    this.messageService.add(`Ошибка входа: пользователь "${login}" не найден или неверный пароль.`);
    return false;
  }

  register(login: string, password: string): boolean {
    let users: User[] = JSON.parse(localStorage.getItem(this.usersKey) || '[]');
    if (users.find(u => u.login === login)) {
      this.messageService.add(`Регистрация не удалась: пользователь "${login}" уже существует.`);
      return false;
    }
    users.push({ login, password });
    localStorage.setItem(this.usersKey, JSON.stringify(users));
    localStorage.setItem(this.currentUserKey, login);
    this.messageService.add(`Пользователь "${login}" успешно зарегистрирован.`);
    return true;
  }

  logout(): void {
    const login = this.currentUser;
    localStorage.removeItem(this.currentUserKey);
    this.messageService.add(`Пользователь "${login}" вышел.`);
  }
}
