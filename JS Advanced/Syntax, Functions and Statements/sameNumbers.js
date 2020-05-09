function solve(number) {
    let x = Array.from(number.toString()).map(Number);
    let sum = x.reduce((a, b) => a + b);
    let isSame = new Set(x);

    console.log(isSame.size  === 1 ? true : false);
    console.log(sum);
}

solve(2222222);