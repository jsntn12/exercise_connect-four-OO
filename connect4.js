// Players p1 and p2 alternate turn. On each turn, a price is dropped into a column until a player get four in arow or the board is full.

class Connect4Game {
	constructor(p1 = 'js', p2 = 'tk', height = 6, width = 7) {
		this.players = [p1, p2];
		this.height = height;
		this.width = width;
		this.board = [];
		this.makeBoard();
	}

	// makeBoard: create game board structure. board = array of rowws, each row is an array of cells.
	makeBoard() {
		for (let row = 0; row < this.height; row++) {
			let newRow = [];
			for (let x = 0; x < this.width; x++) {
				newRow.push('');
			}
			this.board.push(newRow);
		}
	}

	// makeHtmlBoard: creates html table with height x width
	makeHtmlBoard() {
		const htmlBoard = document.getElementById('board');

		// create column-top and added initial player class
		const topRow = document.createElement('tr');
		topRow.setAttribute('id', 'column-top');
		topRow.classList.add('p1');
		topRow.addEventListener('click', this.handleClick);

		// creates column-top row where players drop piece
		for (let x = 0; x < this.width; x++) {
			const dropPieceColumn = document.createElement('td');
			dropPieceColumn.setAttribute('id', x);
			topRow.append(dropPieceColumn);
		}
		htmlBoard.append(topRow);

		// creates the main part of the board
		for (let y = 0; y < this.height; y++) {
			const row = document.createElement('tr');
			for (let x = 0; x < this.width; x++) {
				const cell = document.createElement('td');
				cell.setAttribute('id', `${y}-${x}`);
				row.append(cell);
			}
			htmlBoard.append(row);
		}
	}

	// findSpotForCol: return the top empty spot given the column || null if filled
	findSpotForCol(x) {
		for (let spot = this.height - 1; spot >= 0; spot--) {
			if (!this.board[spot][x]) return spot;
		}
		return null;
	}
}

const game = new Connect4Game();
