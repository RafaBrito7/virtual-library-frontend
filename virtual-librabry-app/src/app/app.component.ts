import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  userName: string;

  constructor(private userService: UserService) { }

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
    debugger;
    this.userName = user.name;
  }
}
