import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatHistory } from './types';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="sidenav">
      <button class="new-chat-button" (click)="onNewChat.emit()">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 5v14m-7-7h14"/>
        </svg>
        New chat
      </button>
      
      <div class="chat-history">
        @for (chat of chatHistory; track chat.id) {
          <div 
            class="chat-item" 
            [class.active]="chat.id === activeId"
            (click)="onSelectChat.emit(chat.id)"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            {{ chat.title }}
          </div>
        }
      </div>
    </nav>
  `
})
export class SidenavComponent {
  @Input() chatHistory: ChatHistory[] = [];
  @Input() activeId: string = '';
  @Output() onNewChat = new EventEmitter<void>();
  @Output() onSelectChat = new EventEmitter<string>();
}