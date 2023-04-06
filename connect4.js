// Players p1 and p2 alternate turn. On each turn, a price is dropped into a column until a player get four in arow or the board is full.

class Connect4Game {
	constructor(p1, p2, height, width) {
		this.players = [p1, p2];
		this.height = height;
		this.width = width;
		this.board = [];
		this.currPlayer = p1;
	}
}
