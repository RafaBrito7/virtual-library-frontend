import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService{

  private token: string;

  private httpOptions: any;

  constructor(private httpClient: HttpClient,
    private router: Router, private authService: AuthenticationService) { }

  buildHeaders(){
    this.token = this.getLoggedUserToken()
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.token
      })
    };
  }

  getLoggedUser() {
    this.buildHeaders();
    return this.httpClient.get(environment.hostUrl + environment.userUrl + `/logged`, this.httpOptions);
  }

  fetchAllUsers(){
    this.buildHeaders();
    return this.httpClient.get(environment.hostUrl + environment.userUrl + `/list`, this.httpOptions);
  }

  getLoggedUserToken(): any {
    return sessionStorage.getItem('token');
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
