import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { CreateBookModalComponent } from './modals/create-book-modal/create-book-modal.component';

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

  constructor(private router: Router, private bookService: BookService, private userService: UserService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchAllBooks();
  }

  fetchAllBooks() {
    this.bookService.fetchAllBooks().subscribe((response: any) => {
      this.bookList = response;
      this.matTable.renderRows();
    }, (error) => {
      console.log(error);
      this.errorAlert("Error: Http " + error.status, error.error.message);
    });
  }

  refresh() {
    this.bookList = [];
    this.fetchAllBooks();
  }

  openCreateModal() {
    const dialogConfig = this.getDialogConfig();
    this.dialog.open(CreateBookModalComponent, dialogConfig);
  }

  private getDialogConfig(): MatDialogConfig {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.direction = 'ltr';
    dialogConfig.disableClose = false;
    dialogConfig.minHeight = 'fit-content'
    dialogConfig.minWidth = '200px'
    return dialogConfig;
  }

  errorAlert(title: string, text: string) {
    Swal.fire({
      icon: 'error',
      title: title,
      text: text,
    })
  }

}