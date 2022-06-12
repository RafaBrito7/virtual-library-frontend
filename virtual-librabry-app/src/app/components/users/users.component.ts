import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';

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

  userList: UserDTO[] = this.fetchAllUsers();

  displayedColumns: string[] = ['position', 'name', 'status', 'profile', 'email'];

  constructor(private userService: UserService, private httpClient: HttpClient) { }

  ngOnInit(): void {
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
      console.log(response);
      console.log(this.userList);
      this.matTable.renderRows();
    }, (error) => {
      console.log(error);
    });
      
    return list;
  }

}