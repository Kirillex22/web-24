import { Component } from '@angular/core';
import { MessageService } from '../message.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-messages',
  imports: [
    CommonModule
  ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
  standalone: true
})
export class MessagesComponent {
  constructor(public messageService: MessageService) {}

}
