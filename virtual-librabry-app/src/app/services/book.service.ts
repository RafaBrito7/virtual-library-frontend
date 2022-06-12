import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private token: string;

  private httpOptions: any;

  constructor(private httpClient: HttpClient,
    private router: Router, private userService: UserService) { }

    buildHeaders(){
      this.token = this.getLoggedUserToken()
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': this.token
        })
      };
    }

    getLoggedUserToken(): any{
      return sessionStorage.getItem('token');
    }

    fetchAllBooks(){
      this.buildHeaders();
      return this.httpClient.get(environment.hostUrl + environment.bookUrl + `/list`, this.httpOptions);
    }
}
