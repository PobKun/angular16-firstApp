import { Component } from '@angular/core';

@Component({
  selector: 'app-loop',
  templateUrl: './loop.component.html',
  styleUrls: ['./loop.component.css']
})
export class LoopComponent {
  numberstring: { [key: string]: string } = { 
      'One': 'One-1', 
      'Two': 'Two-2', 
      'Three': 'Three-3'
  }; 
}
