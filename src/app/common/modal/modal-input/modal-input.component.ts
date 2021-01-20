import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-input',
  templateUrl: './modal-input.component.html',
  styleUrls: ['./modal-input.component.scss']
})
export class ModalInputComponent implements OnInit {
  replyKeyWold = '';
  constructor(
    public dialogRef: MatDialogRef<any>,
  ) { }

  ngOnInit() {
  }

}
