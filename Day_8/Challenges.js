const fs = require('fs');
const sampleInstructionsSet = fs.readFileSync('./sampleInstructionsList.txt', 'utf8').split("\r\n");
const instructionsSet = fs.readFileSync('./InstructionsList.txt', 'utf8').split("\n");

// add all instructions to an array of objects like so  [ { instruction: "nop +0",  isVisited:false }, { instruction: "acc +1",  isVisited:false } ]
const setupInstructionsExecutionLog = instructions => instructions.map(instruction => ({instruction: instruction.replace("\r", ""), isVisited: false}));
const sampleInstructionsExecutionLog = setupInstructionsExecutionLog(sampleInstructionsSet);
const instructionsExecutionLog = setupInstructionsExecutionLog(instructionsSet);

// then, establish an instruction execution rule set, where for every instruction, we set isVisited to true, then execute the instruction like so:
//              -> nop : do nothing, go 1 line down
//              -> acc : add to acc, go 1 line down
//              -> jmp : jmp to given array index
const executeInstructions = instructions => {
    let tempInstructions = [...instructions];
    let accumulator = thisInstructionIndex = 0;
    let thisInstruction = tempInstructions[thisInstructionIndex];

    while(!thisInstruction.isVisited) {
        thisInstruction.isVisited = true;
        tempInstructions[thisInstructionIndex] = thisInstruction;

        const [action, amount] = thisInstruction.instruction.split(" ");
        switch (action) {
            case "nop": { thisInstructionIndex += 1; break; }
            case "jmp": { thisInstructionIndex += Number(amount); break;}
            case "acc": {
                accumulator += Number(amount);
                thisInstructionIndex += 1;
                break;
            };
            default: break;
        }
        thisInstruction = tempInstructions[thisInstructionIndex];
    }
    return accumulator;
}
console.log("Challenge 1:- Accumulator count: ", executeInstructions(instructionsExecutionLog));