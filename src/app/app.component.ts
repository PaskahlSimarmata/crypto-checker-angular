import { Component } from '@angular/core';
import { CurrencyService } from './services/currency.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'crypto-checker';
  selectedCurrency:string='IDR'
  constructor(public currencyService :CurrencyService){

  }
  sendCurency(event:string){ 
    this.currencyService.setCurrency(event)
  }
}
