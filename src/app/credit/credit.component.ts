import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.css']
})
export class CreditComponent {
  accountBalance : number = 0;
  ngOnInit() {
     this.accountBalance = 500;
  }
  creditAccountBalance()
  {
      this.accountBalance += 10;
  }  
}
