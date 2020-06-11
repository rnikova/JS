function solve() {
    let counter = {};

    for (const arg of arguments) {
        let type = typeof arg;

        console.log(`${type}: ` + `${arg}`);
        
        if (counter[type]) {
            counter[type]++;
        } else {
            counter[type] = 1;
        }
    }
    
    counter = Object.entries(counter)
    .sort((a, b) => {
        return b[1] - a[1];
    })
    .forEach(element => {
        console.log(`${element[0]} = ${element[1]}`);
    });
}
