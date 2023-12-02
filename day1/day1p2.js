const fs = require('fs');

function stringToNumber(str) {
    const numberMapping = {
        one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9
    };
    return numberMapping[str];
}

function findMinMax(dictIndexs) {
    let lowest = Number.POSITIVE_INFINITY;
    let highest = Number.NEGATIVE_INFINITY;
    let min, max;

    for (const { Index, Number } of dictIndexs) {
        if (Index < lowest) {
            lowest = Index;
            min = Number;
        }
        if (Index > highest) {
            highest = Index;
            max = Number;
        }
    }

    return { min, max };
}

function findIndex(strInput, dictIndexs, searchArray) {
    for (const str of searchArray) {
        let i = strInput.indexOf(str);
        while (i !== -1) {
            const num = stringToNumber(str);
            dictIndexs.push({ Number: num, Index: i });
            i = strInput.indexOf(str, i + 1);
        }
    }

    return dictIndexs;
}

function buildNumber(str) {
    let dictIndexs = [];

    const strToFind = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    dictIndexs = findIndex(str, dictIndexs, strToFind);

    for (let i = 0; i <= str.length; i++) {
        if (/\d/.test(str[i])) {
            const num = parseInt(str[i], 10);
            dictIndexs.push({ Number: num, Index: i });
        }
    }

    const values = findMinMax(dictIndexs);
    return String(values.min) + String(values.max);
}

function readFile() {
    try {
        const data = fs.readFileSync('day1/day1input.txt', 'utf8');
        const arrayStr = data.split('\n');
        return arrayStr.filter(str => str !== "").map(buildNumber);
    } catch (e) {
        console.log('Error:', e.stack);
    }
}

function returnSum() {
    const arrayOutput = readFile();
    const sum = arrayOutput.map(Number).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return sum;
}

console.log(returnSum());
