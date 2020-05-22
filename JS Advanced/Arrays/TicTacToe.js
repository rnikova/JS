function solve(input) {
    let dashboard = [
        [false, false, false],
        [false, false, false],
        [false, false, false]
    ];
    let player1 = 'X';
    let player2 = 'O';
    let counter = 0;

    for (let row of input) {
        let move = row.split(' ').map(Number);

        if (dashboard[move[0]][move[1]] == false) {
            if (counter %= 2) {
                dashboard[move[0]][move[1]] = player2;
                counter++;
            } else {
                dashboard[move[0]][move[1]] = player1;
                counter++;
            }
        } else {
            console.log("This place is already taken. Please choose another!");
        }
    }

    for (let row = 0; row < dashboard.length; row++) {
        if (dashboard[row].includes(false)) {
            console.log("The game ended! Nobody wins :(");
            printMatrix();
            return;
        }
    }
    for (let i = 0; i < 3; i++) {
        if ((dashboard[i][0] === player1 &&
                dashboard[i][1] === player1 &&
                dashboard[i][2] === player1) ||
            dashboard[i][0] === player2 &&
            dashboard[i][1] === player2 &&
            dashboard[i][2] === player2) {
            console.log(`Player ${dashboard[i][0]} wins!`)
            printMatrix();
            return;
        } else if ((dashboard[0][i] === player1 &&
            dashboard[1][i] === player1 &&
            dashboard[2][i] === player1) ||
            (dashboard[0][i] === player2 &&
                dashboard[1][i] === player2 &&
                dashboard[2][i] === player2)) {
            console.log(`Player ${dashboard[0][i]} wins!`)
            printMatrix();
            return;
        }
    }

    if ((dashboard[0][0] === player1 &&
        dashboard[1][1] === player1 &&
        dashboard[2][2] === player1) ||
        (dashboard[0][0] === player2 &&
            dashboard[1][1] === player2 &&
            dashboard[2][2] === player2)) {
        console.log(`Player ${dashboard[1][1]} wins!`)
        printMatrix();
        return;
    } else if ((dashboard[0][2] === player1 &&
        dashboard[1][1] === player1 &&
        dashboard[2][0] === player1) ||
        (dashboard[0][2] === player2 &&
            dashboard[1][1] === player2 &&
            dashboard[2][0] === player2)) {
        console.log(`Player ${dashboard[1][1]} wins!`)
        printMatrix();
        return;
    }

    function printMatrix() {
        for (let row = 0; row < dashboard.length; row++) {
            console.log(dashboard[row].join("\t"));
        }
    }
}
solve(["0 1",
    "0 0",
    "0 2",
    "2 0",
    "1 0",
    "1 1",
    "1 2",
    "2 2",
    "2 1",
    "0 0"
])