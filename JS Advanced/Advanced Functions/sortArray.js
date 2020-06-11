function solve(arr, sortType) {
    if (sortType === 'asc') {
        return arr.sort(function(a, b){
            return a - b});
    } else{
        return arr.sort(function(a, b){
            return b - a});
    }
}