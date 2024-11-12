import { Component, Input, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { ChatHistory, User } from '../types';
import { ThemeService } from '../theme.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-chat-interface',
  standalone: true,
  imports: [CommonModule, FormsModule, ChatMessageComponent],
  templateUrl: './chat-interface.component.html',
  styleUrls: ['./chat-interface.component.css']
})
export class ChatInterfaceComponent implements AfterViewChecked {
  @Input() currentChat!: ChatHistory;
  @ViewChild('chatContainer') private chatContainer!: ElementRef;
  
  newMessage = '';
  isTyping = false;
  isDarkTheme$ = this.themeService.isDarkTheme$;
  currentUser$ = this.userService.currentUser$;

  constructor(
    private themeService: ThemeService,
    private userService: UserService
  ) {}

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      const element = this.chatContainer.nativeElement;
      element.scrollTop = element.scrollHeight;
    } catch(err) { }
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  getInitials(name: string): string {
    return this.userService.getInitials(name);
  }

  sendMessage() {
    if (!this.newMessage.trim()) return;

    const userMessage = this.newMessage;
    this.currentChat.messages.push({
      content: this.newMessage,
      isUser: true,
      timestamp: new Date()
    });

    if (this.currentChat.messages.length === 2) {
      this.currentChat.title = userMessage.slice(0, 30) + (userMessage.length > 30 ? '...' : '');
    }

    this.newMessage = '';

    this.isTyping = true;
    setTimeout(() => {
      this.isTyping = false;
      this.currentChat.messages.push({
        content: `I received your message: "${userMessage}". This is a demo response.`,
        isUser: false,
        timestamp: new Date()
      });
    }, 1500);
  }
}