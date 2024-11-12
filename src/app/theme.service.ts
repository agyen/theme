import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkTheme = new BehaviorSubject<boolean>(false);
  isDarkTheme$ = this.isDarkTheme.asObservable();

  constructor() {
    const savedTheme = localStorage.getItem('darkTheme');
    if (savedTheme) {
      this.isDarkTheme.next(savedTheme === 'true');
      this.updateTheme(savedTheme === 'true');
    }
  }

  toggleTheme() {
    const newTheme = !this.isDarkTheme.value;
    this.isDarkTheme.next(newTheme);
    localStorage.setItem('darkTheme', newTheme.toString());
    this.updateTheme(newTheme);
  }

  private updateTheme(isDark: boolean) {
    document.body.classList.toggle('dark-theme', isDark);
  }
}