const fs = require('fs');
const boardingPassesList = fs.readFileSync('./PassesList.txt', 'utf8').split("\n");

const getIdNumber = (id, min, max, minKey, maxKey) => {
    let lowerBound = min;
    let upperBound = max;
    let idNumber = 0;
    id.split("").forEach((character, index) => {
        if(index === id.length - 1) idNumber = character === minKey ? lowerBound : upperBound - 1;
        else {
            let diff = (upperBound - lowerBound) / 2;
            if(character === minKey) upperBound -= diff;    
            if(character === maxKey) lowerBound += diff;    
        }
    })
    return idNumber;
}
const getRowColumn = (seatId) => {
    const rowId = seatId.substring(0, 7);
    const columnId = seatId.substring(7);

    const row = getIdNumber(rowId, 0, 128, "F", "B");
    const column = getIdNumber(columnId, 0, 8, "L", "R");
    
    return {row, column};
}
const getSeatID = ({row, column}) => (row * 8) + column;

let highestSeatId = 0;
boardingPassesList.forEach(pass => highestSeatId = Math.max(highestSeatId, getSeatID(getRowColumn(pass))));
console.log("Highest Seat ID: ", highestSeatId);