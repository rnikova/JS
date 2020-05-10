function solve(input) {
    let map = new Map();

    for(let line of input){
        let tokens = line.split(" : ");
        map.set(tokens[0], tokens[1]);
    }

    let initials = new Set();
    Array.from(map.keys()).forEach(k => initials.add(k[0]));


    for(let char of Array.from(initials.keys()).sort()) {
        console.log(char);

        for(let product of Array.from(map.keys()).sort()){
            if(product.startsWith(char)) {
                console.log(`  ${product}: ${map.get(product)}`);
            }
        }
    }
}