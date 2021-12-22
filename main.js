// value representint X and O
const X = 1
const O = -1

const toString = {
    [X]: "X",
    [O]: "O"
}


// set initial state
current_player = X
board = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
]



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
 * 
 * 
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
        const column = board[0][c];
        if (Math.abs(column[0] + column[1] + column[2]) === 3) {
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

const cells = document.querySelectorAll('td');
cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const r = cell.closest('tr').rowIndex; 
        const c = cell.cellIndex;

        console.log(r, c);
        if (board[r][c] == 0) {
            var text = document.createTextNode(toString[current_player]);
            board[r][c] = current_player;
            cell.appendChild(text);
            if (winner()){
                alert("player " + toString[current_player] +  " has won");
            }
            current_player = (current_player == X) ? O : X;
        } 
    });
})