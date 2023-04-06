// Players p1 and p2 alternate turn. On each turn, a price is dropped into a column until a player get four in arow or the board is full.

class Connect4Game {
	constructor(p1 = 'js', p2 = 'tk', height = 6, width = 7) {
		this.players = [p1, p2];
		this.height = height;
		this.width = width;
		this.board = [];
		this.makeBoard();
	}

	makeBoard() {
		for (let row = 0; row < this.height; row++) {
			let newRow = [];
			for (let x = 0; x < this.width; x++) {
				newRow.push('');
			}
			this.board.push(newRow);
		}
	}
}

const game = new Connect4Game();
