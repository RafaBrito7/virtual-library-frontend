import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient,
    private router: Router, private authService: AuthenticationService) { }

    getLoggedUser(){
      //TODO: Implementar rota no back pra buscar o usuário logado
    }

    getLoggedUserToken(){
      return localStorage.getItem('token');
    }

    isUserLogged(): boolean {
      return localStorage.getItem('token') ? true : false;
    }

    logout(){
      this.authService.logout();
    }
}
