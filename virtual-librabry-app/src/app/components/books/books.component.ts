import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { UserService } from 'src/app/services/user.service';

export interface BookDTO {
  title: string;
  category: string;
  inventory: number;
  available: boolean;
  status: string;
}

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})

export class BooksComponent implements OnInit {

  @ViewChild('matTable') matTable: MatTable<BookDTO>;

  bookList: BookDTO[] = [];

  displayedColumns: string[] = ['title', 'category', 'inventory', 'available', 'status'];

  constructor(private router: Router, private bookService: BookService, private userService: UserService) { }

  ngOnInit(): void {
    this.fetchAllBooks();
  }

  fetchAllBooks(){
    this.bookService.fetchAllBooks().subscribe((response: any) => {
      this.bookList = response;
      this.matTable.renderRows();
      console.log(response);
    }, (error) => {
      console.log(error);
    });
  }

  refresh(){
    this.bookList = [];
    this.fetchAllBooks();
  }

}

