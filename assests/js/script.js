let answersCorrect = 0;
let userName = null;
let questionIndex = 0;
let time = 300000;
let correct = null;
let userAnswer = null;
let scores = [];

//querySelectors
const timer = document.querySelector("#timer");
const mainEl = document.querySelector("main");
const startText = document.querySelector("#start-text");
const titleEl = document.querySelector("h1");
const answerList = document.querySelector("ul");
const startButton = document.querySelector("#start-btn");
const submitButton = document.querySelector("#submit-button");
let formEl = document.querySelector("form");

// question list- an array of objects which include text(STRING), answers(ARRAY), and keys(ARRAY)
const questions = [
  {
    text: "How are Java and Javascript related?",
    answers: {
      0: "Java is named after Javascript",
      1: "They are the same thing",
      2: "Javascript was named after Java",
      3: "Javascript is build off of Java",
      len: 4,
      correctanswer: "2",
    },
  },
  {
    text: "What is true about console.log?",
    answers: {
      0: "anything printed using console.log shows up in the developer console",
      1: "console.log is useful to developers to display what variables are set as at different points in an application",
      2: "Console.log isn't visible on the page",
      3: "all of the above",
      len: 4,
      correctanswer: 3,
    },
  },
  {
    text: "Javascript is an object oriented programming language",
    answers: { 0: "True", 1: "False", len: 2, correctanswer: 0 },
  },
  {
    text: "Javascript is an obligatory part of web design",
    answers: { 0: "True", 1: "False", len: 2, correctanswer: 1 },
  },
  {
    text: "Which is not a native Javascript data type?",
    answers: {
      0: "a Boolean",
      1: "a String",
      2: "a Dictionary",
      3: "a Float",
      len: 4,
      correctanswer: 2,
    },
  },
  {
    text: "Strings must be enclosed in ____",
    answers: {
      0: "Double or single quotes",
      1: "Square Brackets",
      2: "Double quotes, only",
      3: "Single quotes, only",
      len: 4,
      correctanswer: 0,
    },
  },
  {
    text: "4.5 is an example of",
    answers: {
      0: "a char",
      1: "a float",
      2: "an int",
      3: "an array",
      len: 4,
      correctanswer: 1,
    },
  },
  {
    text: "When in a function, 'return x' does what?",
    answers: {
      0: "breaks out of a function",
      1: "passes 'x' outside the function",
      2: "both of the above",
      3: "prints 'x' to the console",
      len: 4,
      correctanswer: 2,
    },
  },
  {
    text: "How would you change the title of the following object? \n var customer = { title: 'miss', name: 'E. Elliot'}",
    answers: {
      0: "customer = 'Mrs', 'E. Eliot'",
      1: "customer.title = 'Mr'",
      2: "name = 'Mz'",
      3: "customer.name.title= 'Mx Eliot'",
      len: 4,
      correctanswer: 1,
    },
  },
  {
    text: "Bonus question: Who wrote this quiz?",
    answers: {
      0: " Julianne ",
      1: " Julie ",
      2: " Adrian ",
      3: " Angela ",
      len: 4,
      correctanswer: 3,
    },
  },
];

// const questions = [
//   {
//     text: "question one",
//     answers: {
//       0: "answer text one- true",
//       1: "answer text two- false",
//       len: 2,
//       correct_answer: 0,
//     },
//   },
// ];

// timer functions
const returnTwoDig = function (num) {
  return (num < 10 ? "0" : "") + num;
};

const startTimer = function () {
  // because otherwise it'll start when the page starts. boo
  const countDown = setInterval(function () {
    // calculate minutes and seconds
    let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((time % (1000 * 60)) / 1000);

    let Newtime = minutes + ":" + returnTwoDig(seconds);

    if (time <= 0) {
      clearInterval(countDown);
      // load ending
    } else {
      timer.textContent = `Time remaining: ${Newtime}`;
    }

    time = time - 1000;
  }, 1000);
};

// quiz end functions
const createQuizEnd = function () {
  let nameForm = document.createElement("form");
  nameForm.id = "#formEl";

  let formDiv = document.createElement("div");
  formDiv.innerHTML =
    '<input type="text" name="your-name" placeholder="Enter Your Name" />';
  let newSubmitButton = document.createElement("div");
  newSubmitButton.innerHTML =
    '<button id="submit-button" type="submit">Submit HighScores</button>';

  nameForm.appendChild(formDiv);
  nameForm.appendChild(newSubmitButton);

  return nameForm;
};

// quiz functions
const quizEnd = () => {
  while (answerList.lastChild) {
    answerList.removeChild(answerList.lastChild);
  }
  startText.textContent = "";
  // change title to question text
  titleEl.textContent = `Your Score is ${answersCorrect} of 9`;

  nameForm = createQuizEnd();
  mainEl.appendChild(nameForm);
};

const renderScoreboard = function (event) {
  event.preventDefault();
  let username = document.querySelector("input[name='your-name'").value;
  let scoreTotal = answersCorrect;

  formEl.innerHTML = "";
};

// during quiz
const renderQuestionEl = (quesObj) => {
  // remove existing answers and text
  console.log("renderQuestionEl");
  while (answerList.lastChild) {
    answerList.removeChild(answerList.lastChild);
  }
  startText.textContent = "";
  // change title to question text
  titleEl.textContent = quesObj.text;
  let answers = quesObj.answers;

  for (i = 0; i < answers["len"]; i++) {
    let answer = answers[i];
    let listEl = document.createElement("li");
    let answerBtn = document.createElement("button");
    answerBtn.className = "btn";
    answerBtn.textContent = answer;
    answerBtn.setAttribute("data", `index: ${i}`);
    listEl.append(answerBtn);
    answerList.append(listEl);
  }
};

const evaluate = async function (quesobj, targetText) {
  quesobj = questions[questionIndex - 1];
  if (questionIndex > 0) {
    correctAnswer = quesobj.answers["correctanswer"];
    if (quesobj.answers[correctAnswer] === targetText) {
      answersCorrect++;
      alert("Correct!");
    } else {
      alert("That wasn't the correct answer.");
    }
  } else {
    return;
  }
};

const quiz = async function (target) {
  if (questionIndex < questions.length) {
    let targetText = target.textContent;
    await evaluate(questions, targetText).then((response) => {
      renderQuestionEl(questions[questionIndex]);
      questionIndex++;
      console.log(answersCorrect);
    });
  } else {
    quizEnd();
  }
};

// Event listeners
startButton.addEventListener("click", () => {
  startTimer();
});

answerList.addEventListener("click", (event) => {
  quiz(event.target);
});

formEl.addEventListener("submit", renderScoreboard);
