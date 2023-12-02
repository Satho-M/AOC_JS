const fs = require('fs');

let arrayOutput = readFile();


function buildNumber(str) {
    let firstNum = -1;
    let lastNum = -1;

    for (let i = 0; i <= str.length; i++) {
        if (/\d/.test(str[i]) && firstNum == -1) firstNum = str[i]
        if (/\d/.test(str[i])) lastNum = str[i]
    }

    return firstNum + lastNum
}

function readFile() {
    let arr = [];
    try {
        var data = fs.readFileSync('day1/day1input.txt', 'utf8');
        let arrayStr = data.split('\n');

        arrayStr.forEach((str) => {
            arr.push(buildNumber(str));
        });

        return arr;
    } catch (e) {
        console.log('Error:', e.stack);
    }
}

function returnSum() {
    const nums = arrayOutput.map(Number);
    const sum = nums.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
    }, 0);

    return sum;
}

console.log(returnSum());
