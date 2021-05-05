import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent{
  
  constructor() { }
  
  number = new FormControl('', [Validators.required]);

  getErrorMessage(){
    if (this.number.hasError('required')){
      return 'You must enter a value';
    }
    return this.number.hasError('number') ? 'Not a valid number' : '';
  }

  formatNumber(){
    console.log("implement Service for request API to format Number")
  }
}
