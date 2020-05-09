function solve(arr) {
    let obj = {};

    for (let index = 0; index < arr.length; index += 2) {
        let element = arr[index];
        let value = Number(arr[index + 1]);

        obj[element] = value;
    }

    console.log(obj);
    
}

solve(['Yoghurt', '48', 'Rise', '138', 'Apple', '52']);