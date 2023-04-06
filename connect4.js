// Players p1 and p2 alternate turn. On each turn, a price is dropped into a column until a player get four in arow or the board is full.

class Connect4Game {
	constructor(p1 = 'Red', p2 = 'Blue', height = 6, width = 7) {
		this.players = [p1, p2];
		this.height = height;
		this.width = width;
		this.board = [];
		this.currPlayer = 1;
		this.makeBoard();
		this.makeHtmlBoard();
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
		htmlBoard.classList.add('board');

		this.handleGameClick = this.handleClick.bind(this);

		// create column-top and added initial player class
		const topRow = document.createElement('tr');
		topRow.setAttribute('id', 'column-top');
		topRow.classList.add('p1');
		topRow.addEventListener('click', this.handleGameClick);

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

	// placeInTable: adds players piece to the board
	placeInTable(y, x) {
		const piece = document.createElement('div');
		piece.classList.add('piece');
		piece.classList.add(`player${this.currPlayer}`);
		const place = document.getElementById(`${y}-${x}`);
		place.append(piece);
	}

	// endGame: announces the end of the game
	endGame(msg) {
		let removeEvt = document.getElementById('column-top');
		removeEvt.removeEventListener('click', this.handleGameClick);
		removeEvt.setAttribute('class', '');
		setTimeout(() => alert(msg), 250);
	}

	// handleClick: handles the click of column-top, checks for empty spot, drops piece in place, and checks for win
	handleClick(evt) {
		// get id from clicked cell
		const x = +evt.target.id;
		const y = this.findSpotForCol(x);

		// gets next spot in column. If none, ignores click
		if (y === null) {
			return;
		}

		// places piece in the board and adds it to HTML table
		this.placeInTable(y, x);
		this.board[y][x] = this.currPlayer;

		// checks for win
		if (this.checkForWin()) {
			return this.endGame(`${this.players[this.currPlayer - 1]} won!`);
		}

		// checks for tie
		if (this.board.every((row) => row.every((cell) => cell))) {
			return endGame('The game is a draw! \n Try again');
		}

		// switch players
		this.currPlayer = this.currPlayer === 1 ? 2 : 1;

		// changes the color of the piece being dropped to the current player
		let headerColumnColor = document.getElementById('column-top');
		headerColumnColor.classList.toggle('p1');
		headerColumnColor.classList.toggle('p2');
	}

	// checkForWin; checks the board cells for a winner
	checkForWin() {
		const _win = (cell) =>
			cell.every(
				([y, x]) =>
					y >= 0 &&
					y < this.height &&
					x >= 0 &&
					x < this.width &&
					this.board[y][x] === this.currPlayer
			);

		for (let y = 0; y < this.height; y++) {
			for (let x = 0; x < this.width; x++) {
				const horiz = [
					[y, x],
					[y, x + 1],
					[y, x + 2],
					[y, x + 3],
				];
				const vert = [
					[y, x],
					[y + 1, x],
					[y + 2, x],
					[y + 3, x],
				];
				const diagDR = [
					[y, x],
					[y + 1, x + 1],
					[y + 2, x + 2],
					[y + 3, x + 3],
				];
				const diagDL = [
					[y, x],
					[y + 1, x - 1],
					[y + 2, x - 2],
					[y + 3, x - 3],
				];
				if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
					return true;
				}
			}
		}
	}
}

document.getElementById('start-game').addEventListener('click', () => {
	const p1 = document.getElementById('p1-name');
	const p2 = document.getElementById('p2-name');
	let game = document.getElementById('delete-after-start');
	game.innerHTML = '';

	new Connect4Game(p1.value, p2.value);
});
