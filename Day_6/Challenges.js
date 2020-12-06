const fs = require("fs");
const groupedAnswersList = fs.readFileSync("./AnswersList.txt", "utf8").split(/\r\n\r\n/);

// split answers by group - DONE
// for each group
// if answeredArray doesn't contain this answer, push answers into answeredArray,
// at end of each group, add answeredArray.length into totalCount
// at the end, print totalCount

const getAgreeddAnswersCountByGroup = (groupAnswers) => {
  let agreedQuestions = "";
  groupAnswers.forEach((answer) => {
    const thisPersonAgreedQuestions = answer.split("");
    thisPersonAgreedQuestions.forEach((ans) => {
      if (!agreedQuestions.includes(ans)) agreedQuestions += ans;
    });
  });
  return agreedQuestions.length;
};

let totalAgreedAnswers = 0;
groupedAnswersList.forEach((group, index) => {
    const agreedAnswersCount = getAgreeddAnswersCountByGroup(group.split(/\r\n/));
    totalAgreedAnswers += agreedAnswersCount;
})

console.log("Total agreed answers: ", totalAgreedAnswers);