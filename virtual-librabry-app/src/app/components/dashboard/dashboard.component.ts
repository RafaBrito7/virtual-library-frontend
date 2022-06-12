import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userObject: any;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    if (!this.userService.isUserInStorage()) {
      this.loadUser();
    }
  }

  loadUser() {
    this.userService.getLoggedUser().subscribe((response: any) => {
      this.userObject = {
        name: response.name,
        username: response.email,
        profile: response.profile,
        id: response.resourceHyperIdentifier,
        status: response.status,
        rentedBooks: response.rentedBooks,
        createdDate: response.createdDate
      };
      this.setUser();
    }, (error) => {
      let message = error.error == null ? error.message : error.error.message
      this.errorAlert('Error HTTP ' + error.status, 'Caused by: ' + message);
      console.log(error);
      this.userService.logout();
    });
  }

  setUser() {
    localStorage.setItem('user', JSON.stringify(this.userObject));
  }

  errorAlert(title: string, text: string) {
    Swal.fire({
      icon: 'error',
      title: title,
      text: text,
    })
  }

  goToUserView() {
    this.router.navigate(['users']);
  }

  goToBookView (){
    this.router.navigate(['books']);
  }

}
