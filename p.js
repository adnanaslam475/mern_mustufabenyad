

function minmax(arr) {

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i; j++) {
            console.log(arr[j], arr[j + 1])
            if (arr[j] > arr[j + 1])
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        }
    }
    console.log(arr)
    return arr;
}

function possiblevalues(num) {
    let numnew = 0
    for (let i = num; i <= num; i--) {
        numnew = i * (i - 1)
    }
    console.log(numnew)
};
possiblevalues(6);

// console.log(Math.random().toFixed(25).split('.')[1])