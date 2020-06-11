function solve(firstNumber) {
    let sum = firstNumber;

    function calc(secondNumber) {
        sum += secondNumber;
        return calc;
    }

    calc.toString = function() { return sum };
    return calc;
}
