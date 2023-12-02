const fs = require('fs');

function readFile() {
    let arr = [];
    try {
        var data = fs.readFileSync('day2/day2input.txt', 'utf8');
        let arrayStr = data.split('\n');

        return buildNumber(arrayStr);

    } catch (e) {
        console.log('Error:', e.stack);
    }
}

function buildNumber(arrayStr){
    let gcRed = 12, gcBlue = 14, gcGreen = 13;
    let sumIDs = 0;
    
    for(str of arrayStr){
        let values = getMaxNumberOfCubes(str);
        
        if(gcRed >= parseInt(values.maxRed) && gcGreen >= parseInt(values.maxGreen) && gcBlue >= parseInt(values.maxBlue)){
            sumIDs = sumIDs + parseInt(values.gameId);
            console.log("Game ID: " + values.gameId + " Red: " + values.maxRed + " » " + gcRed + " Blue: " + values.maxBlue + " » " + gcBlue + " Green: " + values.maxGreen+ " » " + gcGreen);
        } 
    }   

    return sumIDs;
}

function getMaxNumberOfCubes(str){
    let maxGreen = 0, maxRed = 0, maxBlue = 0, gameId;
    const pattern = /Game (\d+):([\s\d\w,;]+)/g;
    const matches = str.matchAll(pattern);

    for (const match of matches) {
        gameId = match[1];
        const gameInfo = match[2];

        const rounds = gameInfo.split(';');
        for (const round of rounds) {
            

            const words = round.trim().split(',');
            for(const word of words){
                const [number, color] = word.trim().split(' ');

                if(color.includes("green") && parseInt(number) > maxGreen) maxGreen = parseInt(number);
                else if(color.includes("red") && parseInt(number) > maxRed) maxRed = parseInt(number);
                else if(color.includes("blue") && parseInt(number) > maxBlue) maxBlue = parseInt(number);
            }            
        }
    }

    return {maxGreen, maxBlue, maxRed, gameId};
}

console.log(readFile());
