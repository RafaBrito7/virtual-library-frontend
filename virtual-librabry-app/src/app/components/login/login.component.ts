import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service'

import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  emailInvalid = true;
  successMessage: string;

  invalidLogin = false;
  loginSuccess = false;

  ngForm: FormGroup;


  constructor(private authService: AuthenticationService, private formBuilder: FormBuilder) {
   }

  ngOnInit(): void {
    this.ngForm = this.formBuilder.group({
      username: ["", Validators.required, Validators.pattern("/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/")],
      password: ["", Validators.required]
    })
  }

  authLogin() {
    this.authService.login(this.username, this.password).subscribe((result) => {
      this.invalidLogin = false;
      this.loginSuccess = true;
      this.successMessage = "Login Successful!";

    }, (error) => {
      if (error.status == 401 || error.status == 403) {
        this.errorAlert("Error: Http " + error.status, error.error.message);
      } else {
        this.errorAlert("Oops...", "Something went wrong!")
      }
    });
  }

  errorAlert(title: string, text: string) {
    Swal.fire({
      icon: 'error',
      title: title,
      text: text,
    })
  }

  get emailValidator(){
    return this.ngForm.get("username")
  }

  isEmailInvalid() {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.ngForm.get("username")?.value) 
      || this.ngForm.get("username")?.value == null) {
      this.emailInvalid = false;
      return (false)
    }
    this.emailInvalid = true;
    return (true)
  }

}
