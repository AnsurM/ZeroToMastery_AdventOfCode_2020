const fs = require('fs');
const boardingPassesList = fs.readFileSync('./PassesList.txt', 'utf8').split("\n");

const getIdNumber = (id, min, max, minKey, maxKey) => {
    let lowerBound = min;
    let upperBound = max;
    let idNumber = 0;
    id.split("").forEach((character, index) => {
        if (index === id.length - 1) idNumber = character === minKey ? lowerBound : upperBound - 1;
        else {
            let diff = (upperBound - lowerBound) / 2;
            if (character === minKey) upperBound -= diff;
            if (character === maxKey) lowerBound += diff;
        }
    })
    return idNumber;
}
const getRowColumn = (seatId) => {
    const rowId = seatId.substring(0, 7);
    const columnId = seatId.substring(7);

    const row = getIdNumber(rowId, 0, 128, "F", "B");
    const column = getIdNumber(columnId, 0, 8, "L", "R");

    return { row, column };
}
const getSeatID = ({ row, column }) => (row * 8) + column;

let seatIDList = [];
let lowestSeatId = getSeatID(getRowColumn(boardingPassesList[0]));
let highestSeatId = getSeatID(getRowColumn(boardingPassesList[0]));
boardingPassesList.forEach(pass => {
    const seatId = getSeatID(getRowColumn(pass));
    lowestSeatId = Math.min(lowestSeatId, seatId)    
    highestSeatId = Math.max(highestSeatId, seatId)
    seatIDList.push(seatId);
});

let mySeatId = null;
for (let index = lowestSeatId; index < highestSeatId; index++) {
    if(!(seatIDList.find(id => id === index))) mySeatId = index;
}

console.log("Challenge 1; Highest Seat ID: ", highestSeatId);

console.log("Challenge 2; My Seat ID: ", mySeatId);