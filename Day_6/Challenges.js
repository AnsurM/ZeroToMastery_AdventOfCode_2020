const fs = require("fs");
const groupedAnswersList = fs
  .readFileSync("./AnswersList.txt", "utf8")
  .split(/\r\n\r\n/);

// split answers by group - DONE
// for each group
// if answeredArray doesn't contain this answer, push answers into answeredArray,
// at end of each group, add answeredArray.length into totalCount
// at the end, print totalCount

const getAgreedAnswersCountByGroup = (groupAnswers) => {
  let agreedQuestions = "";
  groupAnswers.forEach((answer) => {
    const thisPersonAgreedQuestions = answer.split("");
    thisPersonAgreedQuestions.forEach((ans) => {
      if (!agreedQuestions.includes(ans)) agreedQuestions += ans;
    });
  });
  return agreedQuestions.length;
};

// split answers by group - DONE
// for each group
// set list of answers to 1st answer,
// for each person's answer, loop over list of answers
// if any of the answer in list is not in this person's answer, slice it from list 
// at end of each group, add listOfAnswer.length into totalCount
// at the end, print totalCount

const getAgreedAnswersCountByGroupChallenge2 = (groupAnswers) => {
  let agreedQuestions = groupAnswers[0].split("");
  groupAnswers.forEach(answer => {
      agreedQuestions.forEach((ans, index) => {
          if(!answer.includes(ans)) agreedQuestions[index] = "";
      })
  });
  return agreedQuestions.join("").length;
};

let totalAgreedAnswers = 0;
let totalAgreedByAllAnswers = 0;
groupedAnswersList.forEach((group) => {
  totalAgreedAnswers += getAgreedAnswersCountByGroup(group.split(/\r\n/));
  totalAgreedByAllAnswers += getAgreedAnswersCountByGroupChallenge2(group.split(/\r\n/));
});

console.log("Total agreed answers: ", totalAgreedAnswers);
console.log("Total agreed answers by all (Challenge 2): ", totalAgreedByAllAnswers);