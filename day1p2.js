const fs = require('fs');

let arrayOutput = readFile();

function stringToNumber(str) {
    const numberMapping = {
        one: 1,
        two: 2,
        three: 3,
        four: 4,
        five: 5,
        six: 6,
        seven: 7,
        eight: 8,
        nine: 9
    };

    return numberMapping[str];
}

function findMinMax(dictIndexs) {

    let lowest = Number.POSITIVE_INFINITY;
    let highest = Number.NEGATIVE_INFINITY;
    let tmp;

    let tmpN;
    let max;
    let min;

    for (var i = dictIndexs.length - 1; i >= 0; i--) {
        tmp = dictIndexs[i].Index;
        tmpN = dictIndexs[i].Number;

        if (tmp < lowest) {
            lowest = tmp;
            min = tmpN;
        }
        if (tmp > highest) {
            highest = tmp;
            max = tmpN;
        }
    }

    return { min, max };
}

function findIndexString(strInput, dictIndexs) {
    const strToFind = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

    strToFind.forEach(str => {
        let i = strInput.indexOf(str);

        while (i !== -1) {
            let num = stringToNumber(str)
            dictIndexs.push({ Number: num, Index: i });
            i = strInput.indexOf(str, i + 1);
        }
    });

    return dictIndexs;
}

function findIndexNumber(strInput, dictIndexs) {
    let num;

    for (let i = 0; i <= strInput.length; i++) {
        if (/\d/.test(strInput[i])) {
            num = parseInt(strInput[i], 10);
            dictIndexs.push({ Number: num, Index: i });
        }
    }

    return dictIndexs;
}

function buildNumber(str) {

    let dictIndexs = [];
    dictIndexs = findIndexString(str, dictIndexs);
    dictIndexs = findIndexNumber(str, dictIndexs);

    let values = findMinMax(dictIndexs);

    return String(values.min) + String(values.max);
}

function readFile() {
    let arr = [];
    try {
        var data = fs.readFileSync('day1input.txt', 'utf8');
        let arrayStr = data.split('\n');

        arrayStr.forEach((str) => {
            if (str !== "") arr.push(buildNumber(str));
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
