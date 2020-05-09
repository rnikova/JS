function solve(input) {
    var number = Number(input.shift());

    let operations = {
        chop: (x) => {return x / 2},
        dice: (x) => {return Math.sqrt(x)},
        spice: (x) => {return ++x},
        bake: (x) => {return x * 3},
        fillet: (x) => {return x - x * 0.2}
    }

    for (let i = 0; i < input.length; i++) {
        number = operations[input[i]](number);
        console.log(number);
        
    }
}

solve([9, 'dice', 'spice', 'chop', 'bake', 'fillet']);