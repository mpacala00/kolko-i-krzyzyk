import { Component, OnInit } from '@angular/core';

@Component({
   selector: 'app-board',
   templateUrl: './board.component.html',
   styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
   squares: any[];
   xIsNext: boolean;
   winner: any;
   draw: boolean;
   winLength = 3;
   boardLength = 3;

   constructor() { }

   ngOnInit(): void {
   }

   newGame() {
      this.squares = Array(this.boardLength * this.boardLength).fill(null);
      this.winner = null;
      this.xIsNext = true;
      this.draw = false;
   }

   get player() {
      return this.xIsNext ? 'X' : 'O';
   }

   makeMove(idx: number) {
      if (this.winner) {
         return;
      }

      if (!this.squares[idx]) {
         this.squares.splice(idx, 1, this.player);
         this.xIsNext = !this.xIsNext;
      }

      this.winner = this.newCalcWinner();
      if (!this.squares.includes(null)) {
         this.draw = true;
      }
   }

   newCalcWinner() {
      var B = this.squares;

      //check rows
      for (var i = 0; i + this.winLength <= this.boardLength; i += 1) {
         // console.log('numOfIteration rows: ', i);
         for (var j = i; j <= (this.boardLength * this.boardLength) - this.boardLength + i; j += this.boardLength) {
            // console.log('checking current combination: [%s]', [B[j], B[j + 1], B[j + 2]])
            if (B[j] !== null && B[j] == B[j + 1] && B[j + 1] == B[j + 2]) {
               this.winner = true;
               return B[j];
            }
         }
      }

      for (var i = 0; i <= this.boardLength; i++) {
         if (B[i] !== null && B[i] === B[i + this.boardLength] && B[i + this.boardLength] === B[i + 2 * this.boardLength]) {
            this.winner = true; //update the state result
            return B[i];
         }
      }

      //check diagonals
      for (var i = 0, j = 4; i <= 2; i = i + 2, j = j - 2) {
         if (B[i] !== null && B[i] == B[i + j] && B[i + j] === B[i + 2 * j]) {
            this.winner = true;
            return B[i];
         }
      }
   }

}
