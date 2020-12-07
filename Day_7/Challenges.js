const fs = require('fs');
const { get } = require('http');
const bagsRuleSet = fs.readFileSync('./BagsInfo.txt', 'utf8').split("\n");

const getParentBags = (bagsList, bagsToLookFor) => {
    let parentBags = [];
    bagsList.forEach(bagContent => {
        let [mainBag, innerBags] = bagContent.split("contain");
        bagsToLookFor.forEach(bag => {
            if(innerBags.includes(bag)) {
                parentBags.push(mainBag.replace(" bags ", ""))
            };
        })
    });
    return parentBags;
}

let bagsToFind = ["shiny gold"];
let totalBagsWithGold = [];

let bagsToLookFor = getParentBags(bagsRuleSet, bagsToFind);

while (bagsToLookFor.length) {
    totalBagsWithGold =  [...new Set([...totalBagsWithGold, ...bagsToLookFor])];
    bagsToLookFor = getParentBags(bagsRuleSet, bagsToLookFor);
}

console.log("Bags with Shiny Gold Inside: ", totalBagsWithGold.length);