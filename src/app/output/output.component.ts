import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { INumber } from '../model/INumber';
import { NumberService } from '../number.service';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss'],
})
export class OutputComponent implements OnInit {
  numberForm: FormGroup;
  sub: Subscription;

  constructor(
    private fb: FormBuilder,
    public numberService: NumberService,
    private clipboard: Clipboard
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.sub = this.numberService.formatNumber$.subscribe((fNumber) => {
      this.fillForm(fNumber);
    });
  }

  private buildForm() {
    this.numberForm = this.fb.group({
      countryCode: [''],
      areaCode: [''],
      mainNumber: ['', Validators.required],
      extension: [''],
    });
  }

  private fillForm(fNumber: INumber) {
    this.numberForm.setValue({
      countryCode: fNumber.countryCode,
      areaCode: fNumber.areaCode,
      mainNumber: fNumber.mainNumber,
      extension: fNumber.extension,
    });
  }

  getFormatNumberAsString(): string {
    var numberAS = '';
    if (
      this.numberForm.get('countryCode').value != null &&
      this.numberForm.get('countryCode').value != ''
    ) {
      numberAS = numberAS + '+' + this.numberForm.get('countryCode').value;
    }
    if (
      this.numberForm.get('areaCode').value != null &&
      this.numberForm.get('areaCode').value != ''
    ) {
      numberAS = numberAS + ' ' + this.numberForm.get('areaCode').value;
    }
    if (
      this.numberForm.get('mainNumber').value != null &&
      this.numberForm.get('mainNumber').value != ''
    ) {
      numberAS = numberAS + ' ' + this.numberForm.get('mainNumber').value;
    }
    if (
      this.numberForm.get('extension').value != null &&
      this.numberForm.get('extension').value != ''
    ) {
      numberAS = numberAS + '-' + this.numberForm.get('extension').value;
    }
    return numberAS;
  }

  copy() {
    var numberCopy = this.getFormatNumberAsString();
    this.clipboard.copy(numberCopy);
  }
}
