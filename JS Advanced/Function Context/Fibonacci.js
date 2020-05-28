function getFibonator() {
    let previousEl = 0;
    let currentEl = 1;

    return function () {
        let result = previousEl + currentEl;
        previousEl = currentEl;
        currentEl = result;

        return previousEl;
    }
}