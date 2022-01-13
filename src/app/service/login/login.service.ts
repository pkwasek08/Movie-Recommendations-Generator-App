import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl = environment.apiUrl + 'user';
  constructor(private http: HttpClient) { }

  public getLoggedUser(): User {
    const localStorageItem = JSON.parse(localStorage.getItem('user'));
    return localStorageItem === null ? null : localStorageItem.user;
  }

  public doLogin(email: string, password: string) {
    const params = new HttpParams().set('email', email).set('password', password);
    return this.http.get<User>(this.apiUrl + '/login?' + params);
  }

  public setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify({ user: user }));
  }

  public doRegistration(user: User) {
    return this.http.post<User>(this.apiUrl + '/newUser', user);
  }

  public signOutUser() {
    localStorage.removeItem('user');
  }


  public isLoggedAdmin(): boolean {
    return (this.getLoggedUser().id === 1);
  }

  public isLoggedUser(): boolean {
    return (this.getLoggedUser() != null);
  }
}
