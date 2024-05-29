import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-debit',
  templateUrl: './debit.component.html',
  styleUrls: ['./debit.component.css']
})
export class DebitComponent {
  @Input('accountBalance') accountBalance: number = 0;
  @Output() accountBalanceChange = new EventEmitter();
  
  debitAccountBalance()
  {
      this.accountBalance -= 10;
      this.accountBalanceChange.emit(this.accountBalance);
  }      
}
