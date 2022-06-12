import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  userName: string;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    if (this.isLogged()) {
      this.getUser();
    }
  }

  logout(){
    this.userService.logout();
  }

  isLogged() : boolean{
    return this.userService.isUserLogged();
  }

  getUser(){
    let user = this.userService.getLoggedUserObject();
    this.userName = user.name;
  }

  goToUserView(){
    this.router.navigate(['users']);
  }

  goToHomeView(){
    this.router.navigate(['home']);
  }

  goToBookView(){
    this.router.navigate(['books']);
  }
}
