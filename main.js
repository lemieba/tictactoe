// value representint X and O
const X = {
    val: 1,
    output: "X",
    color: "#010440"
};
const O = {
    val: -1,
    output: "O",
    color: "#A64724"
};



// set initial state
current_player = X;
board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
];

// helper functions
/**
 * how to check if there is a winner
 *
 * input:
 * output: boolean
 *
 * goal
 * does the current board have a winner
 *
 * solution:
 * check if any of the rows are winners
 * chekc if any of the columns are winners
 * check if any of the diagonals are winners
 * rc
 * 00
 * 10
 * 20
 *
 * 01
 * 11
 * 21
 */
function winner() {
    // check rows
    for (let r = 0; r < board.length; r++) {
        const row = board[r];
        if (Math.abs(row[0] + row[1] + row[2]) === 3) {
            return true;
        }
    }

    // check columns
    for (let c = 0; c < board[0].length; c++) {
        if (Math.abs(board[0][c] + board[1][c] + board[2][c]) === 3) {
            return true;
        }
    }

    // check diagonals
    if (Math.abs(board[0][0] + board[1][1] + board[2][2]) === 3) {
        return true;
    }
    if (Math.abs(board[0][2] + board[1][1] + board[2][0]) === 3) {
        return true;
    }

    return false;
}

function XOElement(player, size) {
    var text = document.createTextNode(player.output);
    var OX = document.createElement("span");
    OX.appendChild(text);
    OX.style.fontSize = size;
    OX.style.color = player.color;
    return OX;
}

function showResult(player, result) {
    var board = document.getElementById("board");
    console.log(board.style.display);
    board.style.display = "none";

    var winner_elem = document.getElementById("winner");

    if (result == "DRAW!") {
        var row1 = document.createElement('tr');
        row1.style.textAlign = 'center';
        row1.appendChild(XOElement(X, "400px"));
        row1.appendChild(XOElement(O, "400px"));
        winner_elem.appendChild(row1)

    } else {
        var row1 = document.createElement('tr');
        row1.style.textAlign = 'center';
        row1.appendChild(XOElement(player, "400px"));
        winner_elem.appendChild(row1)
    }

    var row2 = document.createElement('tr');
    row2.style.textAlign = 'center';
    var text = document.createElement("span");
    text.appendChild(document.createTextNode(result));
    text.style.fontSize = '100px';
    text.style.color = player.color;
    
    row2.appendChild(text);

    winner_elem.appendChild(row2)
    //
    // <span style="font-size: 50px;">WINNER!</span>
    console.log(winner_elem.style.display);
    winner_elem.style.display = "block";
}

function draw() {
    for (let i = 0; i < board.length; i++) {
        const row = board[i];
        for (let j = 0; j < row.length; j++) {
            const elem = row[j];
            if (elem == 0) {
                return false;
            }
        }
    }
    return true;
}

const cells = document.querySelectorAll("td");
cells.forEach((cell) => {
    cell.addEventListener("click", () => {
        const r = cell.closest("tr").rowIndex;
        const c = cell.cellIndex;

        console.log(r, c);
        if (board[r][c] == 0) {
            board[r][c] = current_player.val;
            cell.appendChild(XOElement(current_player, "175px"));
            if (winner()) {
                showResult(current_player, "WINNER!");
            } else if (draw()) {
                showResult(current_player, "DRAW!")
            }
            current_player = current_player === X ? O : X;
        }
    });
});
