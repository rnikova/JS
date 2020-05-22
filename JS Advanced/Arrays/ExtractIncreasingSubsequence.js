function solve(input) {
    input = input.map(Number);
    let currentBiggestNum = Number.NEGATIVE_INFINITY;

    for (let currentNumber of input) {
        if (currentNumber >= currentBiggestNum) {
            currentBiggestNum = currentNumber;
            console.log(currentNumber);
        }
    }
}