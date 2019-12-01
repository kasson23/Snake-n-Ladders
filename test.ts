class SnakesLadders {
    public board = new Board();
    public player1 = new Player(true, this.board.start);
    public player2 = new Player(false, this.board.start);

    constructor() {
        // Good luck
    }

    play(die1: number, die2: number): string {
        let whosTurn = this.player1.turn == true ? 1 : 2;
        let output: string = "";
        if (whosTurn == 1)
        {
            // roll the dice for the player
            this.player1.boardLocation += (die1 + die2);

            // check if it is a available slide - if so, move to new square
            this.player1.boardLocation = this.board.checkIfNumberIsSlide(this.player1.boardLocation);

            // check if sqaure == 100
            if (this.player1.boardLocation > 100) {
                this.player1.boardLocation = this.board.checkIfLocIsWinnerOrOver(this.player1.boardLocation, (die1 + die2))
            }

            if (this.player1.boardLocation == 100) {
                output = `Player ${whosTurn} Wins!`;
            }
            // check dice was a double
            else if (die1 == die2) {
                output = `Player ${whosTurn} is on square ${this.player1.boardLocation}`; 
            }
            // else change turn and reroll
            else {
                this.player1.turn = false;
                this.player2.turn == true;
                output = `Player ${whosTurn} is on square ${this.player1.boardLocation}`; 
            }
            return output;
        }

        // Player 2 Turn
        else {
            this.player2.boardLocation += (die1 + die2);

            // check if it is a available slide - if so, move to new square
            this.player2.boardLocation = this.board.checkIfNumberIsSlide(this.player2.boardLocation);

            // check if sqaure > 100
            if (this.player2.boardLocation > 100) {
                this.player2.boardLocation = this.board.checkIfLocIsWinnerOrOver(this.player2.boardLocation, (die1 +die2))
            }

            // check if sqaure == 100
            if (this.player2.boardLocation == 100) {
                output = `Player ${whosTurn} Wins!`;
            }
            // check dice was a double
            else if (die1 == die2) {
                output = `Player ${whosTurn} is on square ${this.player2.boardLocation}`; 
            }
            // else change turn and reroll
            else {
                this.player2.turn = false;
                this.player1.turn = true;
                output = `Player ${whosTurn} is on square ${this.player2.boardLocation}`; 
            }
            return output;
        }
  }

}
class Board {
    public start: number = 0;
    public end: number = 100;
    public avaSlides: number[][] = [[2, 38], [7, 14], [8, 31], [15, 26], [16, 6], [21, 42], [28, 84], [36, 44], [46, 25], [49, 11], [51, 67], [62, 19], [64, 60], [71, 91], [74, 53], [78, 98], [87, 94], [92, 88], [95, 75], [99, 80]];
    public checkIfNumberIsSlide(loc: number): number {
        let returnNum: number = loc;
        for (let i in this.avaSlides) {
            if (loc == this.avaSlides[i][0]) {
                returnNum =  this.avaSlides[i][1];
            }
        }
        return returnNum;
    }
    public checkIfLocIsWinnerOrOver(loc: number, numRolled: number): number {
        let newL = numRolled - (100 - loc); 
        return 100 - newL;
    }
}

class Player {
    public turn: boolean;
    public boardLocation: number = 1;
    public constructor(t: boolean, loc:number) {
        this.turn = t;
        this.boardLocation = loc;
    }
}


let game = new SnakesLadders();
console.log(game.play(1, 1));
console.log(game.play(1, 5));
console.log(game.play(6, 2));
console.log(game.play(1, 1));


