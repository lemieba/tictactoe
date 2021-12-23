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
const DRAW = "DRAW!";
const WINNER = "WINNER!";



// set initial state
currentPlayer = X;
board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
];

function restart() {
    currentPlayer = X;
    board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ];

    var winning_elem = document.getElementById("winner");
    winning_elem.innerHTML = "";
    winning_elem.style.display = "none";

    
    var boardTable = document.getElementById("board");
    const cells = document.querySelectorAll("td");
    cells.forEach(cell => {
        cell.innerHTML = ''
    });
    cells.forEach((cell) => {
        cell.addEventListener("click", () => {
            const r = cell.closest("tr").rowIndex;
            const c = cell.cellIndex;
    
            if (board[r][c] == 0) {
                board[r][c] = currentPlayer.val;
                cell.appendChild(XOElement(currentPlayer, "175px"));
                if (winner()) {
                    showResult(currentPlayer, WINNER);
                } else if (draw()) {
                    showResult(currentPlayer, DRAW)
                }
                currentPlayer = currentPlayer === X ? O : X;
            }
        });
    });    
    boardTable.style.display = ""
}


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
    board.style.display = "none";

    var winner_elem = document.getElementById("winner");

    if (result == DRAW) {
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


    var row3 = document.createElement('tr');
    row3.style.textAlign = 'center';
    var button = document.createElement('button');
    button.classList.add('button');
    button.appendChild(document.createTextNode('RESTART'));
    button.onclick = restart;
    row3.appendChild(button);
    winner_elem.appendChild(row3);
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

restart();