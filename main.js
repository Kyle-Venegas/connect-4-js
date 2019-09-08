const width = 7;
const height = 6;
var turn = 1;
var game = document.getElementById("game");
var won;

var display = document.createElement("h1");
display.innerHTML = playerColorText(turn) + "'s turn";
game.appendChild(display);

function resetButton() {
	var area = document.createElement('div');
	var reset = document.createElement("button");
	area.id = 'reset';
	reset.innerHTML = 'reset';
	area.appendChild(reset);
	game.appendChild(area);
	reset.onclick = function() { clear_board(); };
}

var board = [];
for (var j = 0; j < height; j++) {
	board[j] = [];
	for (var i = 0; i < width; i++) {
		board[j][i] = "_";
	}
}

function clear_board() {
	for (var j = 0; j < height; j++) {
		for (var i = 0; i < width; i++) {
			board[j][i] = "_";
			document.getElementById(j + "," + i).style.backgroundColor = '';
		}
	}
	turn = 1;
	display.innerHTML = playerColorText(turn) + "'s turn";
	won = false;
}

function playerLetter(turn) {
	return ((player = turn % 2) ? 'X' : 'O');
}

function playerColor(turn) {
	return ((player = turn % 2) ? '#DC564E' : '#FAC65B');
}

function playerColorText(turn) {
	return ((player = turn % 2) ? 'red' : 'yellow');
}

function createBoard() {
	var tbl = document.createElement("table");
	var tblBody = document.createElement("tbody");
	tbl.appendChild(tblBody);
	// cell creation
	for (var j = 0; j < height; j++) {
		// tr creation
		var row = document.createElement("tr");
		for (var i = 0; i < width; i++) {
			var cell = document.createElement("td");
			cell.id = "" + j + "," + i;
			row.appendChild(cell);
		}
	tblBody.appendChild(row);
	} game.appendChild(tbl);
}

//
function drop(col) {
	if (won) {
		return;
	}
	for (var j = height - 1; j >= 0; j--) {
		if (board[j][col] == "_") {
			board[j][col] = playerLetter(turn);
			document.getElementById(j + "," + col).style.backgroundColor = playerColor(turn);
			if (win()) {
				display.innerHTML = playerColorText(turn) + " wins";
				won = true;
				break;
			}
			turn++;
			display.innerHTML = playerColorText(turn) + "'s turn";
			break;
		}
	}
}

function addButtons() {
	// buttons for dropping
	var input = document.createElement("div");
	input.id = "button-area";
	for (let i = 0; i < width; i++) {
		var dropper = document.createElement("button");
		dropper.id = i;
		dropper.addEventListener('click', function() { drop(i); });
		input.appendChild(dropper);
	}
	game.appendChild(input);
}

function win() {
	for (var i = 0; i < width; i++) {
		if (check_col(i)) {
			return true;
		}
	} for (var i = 0; i < height; i++) {
		if (check_row(i)) {
			return true;
		}
	}
	//diagonals
	var row = 3;
	while (row <= height - 1) {
		for (var i = 0; i < width - 3; i++) {
			if (check_slash(i, row)) {
				return true;
			}
		} row++;
	} 
	row = 3;
	while (row <= height - 1) {
		for (var i = width - 1; i > 2; i--) {
			if (check_backslash(i, row)) {
				return true;
			}
		} row++;
	}
	return false;
}

function check_col(col) {
	var counter = 1;
	for (var j = height - 2; j > -1; j--) {
		if (board[j][col] == board[j+1][col] && board[j][col] == playerLetter(turn)) {
			counter++;
		} if (board[j][col] == playerLetter(turn) && playerLetter(turn) != board[j+1][col]) {
			counter = 1;
		}
	} return (counter >= 4);
}

function check_row(row) {
	var counter = 1;
	for (var i = 1; i < width; i++) {
		if (board[row][i] == board[row][i-1] && board[row][i] == playerLetter(turn)) {
			counter++;
		} if (board[row][i] == playerLetter(turn) && playerLetter(turn) != board[row][i-1]) {
			counter = 1;
		}
	} return (counter >= 4);
}

function check_slash(col, row) {
	var y = row - 1;
	var x = col + 1;
	var counter = 1;
	for (var i = x; i < x + 3; i++) {
		if (board[y][i] == board[y+1][i-1] && board[y][i] == playerLetter(turn)) {
			counter++;
			y--;
		}
	} return (counter >= 4);
}

function check_backslash(col, row) {
	var y = row - 1;
	var x = col - 1;
	var counter = 1;
	for (var i = x; i > x - 3; i--) {
		if (board[y][i] == board[y+1][i+1] && board[y][i] == playerLetter(turn)) {
			counter++;
			y--;
		}
	} return (counter >= 4);
}

addButtons();
createBoard();
resetButton();
