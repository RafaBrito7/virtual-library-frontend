import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookService } from 'src/app/services/book.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-book-modal',
  templateUrl: './create-book-modal.component.html',
  styleUrls: ['./create-book-modal.component.css']
})
export class CreateBookModalComponent implements OnInit {

  form: FormGroup;
  title: string;

  categoryList: string[] = [];

  categorySelected: string;

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateBookModalComponent>, private bookService: BookService) { 
    }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl()
    });
  this.fetchCategories();
  }

  save() {
    let book = {
      title: this.form.get('title')?.value,
      category: this.categorySelected
    }
    debugger;
    this.bookService.saveBook(book).subscribe(() => {
      this.categoryList = [];
      this.form.reset();
      console.log("Book created with Successful!");
      this.close();
    }, (error) => {
      if (error.status == 401 || error.status == 403) {
        this.errorAlert("Error: Http " + error.status, error.error.message);
      } else {
        this.errorAlert("Error: Http " + error.status, error.message);
      }
      this.close();
    });
  }

  close() {
    this.dialogRef.close();
  }

  fetchCategories(){
    this.bookService.fetchCategories().subscribe((response: any) => {
      this.categoryList = response;
    }, (error) => {
      console.log(error);
    });
  }

  errorAlert(title: string, text: string) {
    Swal.fire({
      icon: 'error',
      title: title,
      text: text,
    })
  }

}
