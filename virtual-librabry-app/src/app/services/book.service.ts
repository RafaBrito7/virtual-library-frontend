import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private basedUrl = 'http://ec2-3-89-88-222.compute-1.amazonaws.com:8080/api/book';

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
      return this.httpClient.get(this.basedUrl + `/list`, this.httpOptions);
    }
}
