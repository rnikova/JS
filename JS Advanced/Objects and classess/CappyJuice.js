function solve(input) {
    let fruits = [];
    let bottles = [];

    for (let line of input) {
        let fruit = line.split(' => ');

        if (!fruits.hasOwnProperty(fruit[0])) {
            fruits[fruit[0]] = 0;
        }

        fruits[fruit[0]] += Number(fruit[1]);

        if (fruits[fruit[0]] >= 1000) {
            bottles[fruit[0]] = parseInt(fruits[fruit[0]] / 1000);
        }
    }

    for (let fruit of Object.keys(bottles)) {
        console.log(`${fruit} => ${bottles[fruit]}`);
    }
}

solve(['Orange => 2000',
    'Peach => 1432',
    'Banana => 450',
    'Peach => 600',
    'Strawberry => 549'
]);