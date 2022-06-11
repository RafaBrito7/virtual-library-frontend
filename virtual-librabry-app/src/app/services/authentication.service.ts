import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public username: string;
  public password: string;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    
  };

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string) {
    let userDTO = {
      email: username,
      password: password
    };
    return this.http.post(environment.hostUrl + `/login`, userDTO, this.httpOptions).pipe(map((response) => {
      this.username = username;
      this.password = password;
      console.log(response);
      let resp = JSON.parse(JSON.stringify(response));
      this.registerSuccessfulLogin(resp.token);
    }));
  }

  registerSuccessfulLogin(clientToken: string) {
    console.log(clientToken);
    sessionStorage.setItem('token', clientToken);
  }

  logout(){
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
