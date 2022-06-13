import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-book-modal',
  templateUrl: './create-book-modal.component.html',
  styleUrls: ['./create-book-modal.component.css']
})
export class CreateBookModalComponent implements OnInit {

  form: FormGroup;
  title: string;

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateBookModalComponent>) { 
    }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [this.title, []]
  });
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}
