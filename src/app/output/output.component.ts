import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss'],
})
export class OutputComponent implements OnInit {
  numberForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.numberForm = this.fb.group({
      countryNumber: ['', Validators.required],
      preNumber: ['', Validators.required],
      mainNumber: ['', Validators.required],
      extraNumber: ['', Validators.required],
    });
  }

  copy() {}
}
