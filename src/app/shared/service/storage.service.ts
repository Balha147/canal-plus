import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(key: string, user: any): void {
    window.sessionStorage.removeItem(key);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private isLoggedInFromStorage(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    return !!user;
  }

  public isLoggedIn(): Observable<boolean> {
    const isLoggedIn = this.isLoggedInFromStorage();
    this.isLoggedInSubject.next(isLoggedIn);
    return this.isLoggedInSubject.asObservable();
  }
}
