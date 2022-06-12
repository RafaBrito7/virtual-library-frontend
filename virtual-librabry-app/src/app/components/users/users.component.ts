import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

export interface UserDTO {
  name: string;
  position: number;
  status: string;
  profile: string;
  email: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  @ViewChild('matTable') matTable: MatTable<UserDTO>;

  userList: UserDTO[] = [];

  displayedColumns: string[] = ['position', 'name', 'status', 'profile', 'email'];

  constructor(private userService: UserService, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.fetchAllUsers();
  }

  fetchAllUsers(): UserDTO[]{
    let count = 1;
    let list: UserDTO[] = [];
    this.userService.fetchAllUsers().subscribe((response: any) => {
      response.forEach((data: any) => {
        let userObject = {
          position: count,
          name: data.name,
          status: data.status,
          profile: data.profile,
          email: data.email
        };
        count = count + 1;
        list.push(userObject);
      });
      this.userList = list;
      this.matTable.renderRows();
    }, (error) => {
      console.log(error);
    });
    return list;
  }

  refresh(){
    this.userList = [];
    this.fetchAllUsers();
    this.matTable.renderRows();
  }

  errorAlert(title: string, text: string) {
    Swal.fire({
      icon: 'error',
      title: title,
      text: text,
    })
  }

}
