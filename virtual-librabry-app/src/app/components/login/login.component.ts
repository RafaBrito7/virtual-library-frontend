import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  errorMessage = 'Invalid Credentials'
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;


  constructor() { }

  ngOnInit(): void {
  }

  handleLogin(){
    console.log("Entrou!")
  }

}
