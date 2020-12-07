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

let totalBagsWithGold = [];
let bagsToLookFor = getParentBags(bagsRuleSet, ["shiny gold"]);
while (bagsToLookFor.length) {
    totalBagsWithGold =  [...new Set([...totalBagsWithGold, ...bagsToLookFor])];
    bagsToLookFor = getParentBags(bagsRuleSet, bagsToLookFor);
}

console.log("Bags with Shiny Gold Inside: ", totalBagsWithGold.length);

// challenge 2

// let totalBags = 0;
// const getInnerBags = (bag) => {
//     if(!bag) return;
//     const [parent, inner] = bag.split(" contain ");
//     if(!inner) return;
//     const innerBags = inner.split(", ");
//     if(!innerBags) return;
//     console.log(parent, innerBags, totalBags);
//     innerBags.forEach((innerBag) => {
//         const bagQuantity = Number(innerBag.split(" ")[0]);
//         const bagStringIndex = innerBag.indexOf(" bag");
//         const bagColor = innerBag.slice(2, bagStringIndex);
//         if(!bagQuantity || !bagColor) return console.log("No other bags found in: ", parent);
//         totalBags += bagQuantity;
//         setTimeout(() => {
//             getInnerBags(getBagInfo(bagColor));            
//         }, 3000);
//     })
// }

// const getBagInfo = bagColor => bagsRuleSet.find(bag => bag.includes(`${bagColor} bags contain`));

// getInnerBags(getBagInfo("shiny gold"));
// console.log(`Bags Inside Gold: `, totalBags);