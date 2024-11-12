import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './types';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUser = new BehaviorSubject<User>({
    name: 'John Doe',
    email: 'john@example.com'
  });
  
  currentUser$ = this.currentUser.asObservable();

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  }
}