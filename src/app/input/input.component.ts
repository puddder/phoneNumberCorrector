import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NumberService } from '../number.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  constructor(public numberService: NumberService) {}

  number = new FormControl('', [Validators.required]);
  mobile: boolean;

  getErrorMessage() {
    if (this.number.hasError('required')) {
      return 'You have to enter a number';
    }
    return this.number.hasError('number') ? 'Not a valid number' : '';
  }

  formatNumber() {
    this.numberService.goFormatNumber(this.number.value, this.mobile);
  }
}
