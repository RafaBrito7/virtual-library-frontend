import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private token: string = this.getLoggedUserToken();

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token
    }),
  };

  constructor(private httpClient: HttpClient,
    private router: Router, private authService: AuthenticationService) { }

  getLoggedUser() {
    console.log(this.token);
    return this.httpClient.get(environment.hostUrl + environment.userUrl + `/logged`, this.httpOptions);
  }

  getLoggedUserToken(): any {
    let token = sessionStorage.getItem('token');
    console.log(token)
    return token;
  }

  isUserLogged(): boolean {
    return sessionStorage.getItem('token') ? true : false;
  }

  isUserInStorage(): boolean {
    return localStorage.getItem('user') ? true : false;
  }

  logout() {
    this.token = '';
    this.authService.logout();
  }

  getLoggedUserObject(): any{
    return JSON.parse(localStorage.getItem('user') || '{}');
  }
}
