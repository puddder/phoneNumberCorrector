import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { INumber } from './model/INumber';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NumberService {
  private numberIsForm: boolean = false;
  private formatNumber = new ReplaySubject<INumber>(1);
  private url: string = 'https://swq.kr31sw1chs.de/PhnoeNumber/Format';

  constructor(private http: HttpClient) {}

  getNumberIsFormatted(): boolean {
    return this.numberIsForm;
  }

  /**
   * setter for formatNumber
   * @param nr number to set
   */
  setFormatNumber(nr: INumber) {
    this.formatNumber.next(nr);
  }

  /**
   * getter for FormatNumber
   */
  get formatNumber$() {
    return this.formatNumber.asObservable();
  }

  goFormatNumber(number: string, isMobile: boolean): void {
    this.fetchFormNumber(number, isMobile).subscribe((data) => {
      this.fillNumbers(data);
    });
  }

  /**
   * request to format a number
   * @param number number that will be formatted
   * @returns formatted number
   */
  fetchFormNumber(number: string, isMobile: boolean): Observable<any> {
    var url = this.createUrlForFetchNumber(number, isMobile);
    return this.http.get(url);
  }

  createUrlForFetchNumber(number: string, isMobile: boolean): string {
    var numberReplaced1 = number.replace('+', '%2B');
    var numberReplaced2 = numberReplaced1.split(' ').join('%20');
    var url =
      this.url + '?number=' + numberReplaced2 + '&isMobileNumber=' + isMobile;
    return url;
  }

  fillNumbers(nr: any) {
    this.setFormatNumber(nr);
    this.numberIsForm = true;
  }
}
