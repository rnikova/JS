function solve(input) {
    input = input.map(Number);
    let currentBiggestNum = Number.NEGATIVE_INFINITY;

    for(let i=0; i<input.length; i++) {
        let currentNumber = input.shift();
        
        if(currentNumber >= currentBiggestNum) {
            currentBiggestNum = currentNumber;
            console.log(currentNumber);
        }
    }
}