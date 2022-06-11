import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service'

import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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


  constructor(private authService: AuthenticationService, private formBuilder: FormBuilder, 
    private router: Router) {
   }

  ngOnInit(): void {
    this.ngForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  authLogin() {
    this.authService.login(this.username, this.password).subscribe(() => {
      this.clearFields();
      console.log("Login Successful!");
      this.router.navigate(['home']);
    }, (error) => {
      if (error.status == 401 || error.status == 403) {
        this.errorAlert("Error: Http " + error.status, error.error.message);
      } else {
        this.errorAlert("Oops...", "An unknown error has occurred, contact your system administrator.");
      }
      this.clearFields();
    });
  }

  errorAlert(title: string, text: string) {
    Swal.fire({
      icon: 'error',
      title: title,
      text: text,
    })
  }

  emailValidator(){
    return this.ngForm.get("username");
  }

  isEmailInvalid() {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.ngForm.get("username")?.value) 
      || this.ngForm.get("username")?.value == null) {
      this.emailInvalid = false;
      return (false);
    }
    this.emailInvalid = true;
    return (true);
  }

  clearFields(){
    this.ngForm.reset();
  }

}
