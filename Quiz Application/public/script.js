// Elements
const usernameInput = document.getElementById("username");
const categorySelect = document.getElementById("category");
const startButton = document.getElementById("start-btn");
const landing = document.getElementById("landing");
const quizBox = document.getElementById("quiz-box");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const resultBox = document.getElementById("result");
const timerDisplay = document.getElementById("timer");
const progressBar = document.getElementById("progress-bar");
const leaderboardList = document.getElementById("leaderboard");
const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");
const timeoutSound = document.getElementById("timeoutSound");

let username, category, questions = [], shuffled, index = 0, score = 0, timer, timeLeft;

// Load or create leaderboard
let leaderboard = JSON.parse(localStorage.getItem("quizLeaderboard")) || [];

// Category questions generator
function generateQuestions() {
  const html = [
    {
      question: "What does HTML stand for?",
      answers: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyperlink Text Manipulation Language"],
      correct: 0
    },
    {
      question: "Which tag is used to define an image in HTML?",
      answers: ["<img>", "<image>", "<src>", "<pic>"],
      correct: 0
    },
    {
      question: "Which HTML tag is used to define a hyperlink?",
      answers: ["<a>", "<link>", "<href>", "<hyper>"],
      correct: 0
    },
    {
      question: "Which element represents the largest heading?",
      answers: ["<h6>", "<heading>", "<h1>", "<head>"],
      correct: 2
    },
    {
      question: "What attribute is used to define inline styles?",
      answers: ["class", "style", "font", "styles"],
      correct: 1
    },
    {
      question: "What is the correct HTML tag for inserting a line break?",
      answers: ["<br>", "<break>", "<lb>", "<line>"],
      correct: 0
    },
    {
      question: "Which HTML tag is used to define a table?",
      answers: ["<table>", "<tab>", "<tbl>", "<t>"],
      correct: 0
    },
    {
      question: "Which HTML attribute specifies an alternate text for an image?",
      answers: ["alt", "src", "title", "longdesc"],
      correct: 0
    },
    {
      question: "Which tag is used to define a list item?",
      answers: ["<li>", "<list>", "<ul>", "<item>"],
      correct: 0
    },
    {
      question: "How can you open a link in a new tab?",
      answers: ['target="_blank"', 'target="_self"', 'target="_new"', 'newtab="true"'],
      correct: 0
    },
    {
      question: "Which tag defines a division or a section in an HTML document?",
      answers: ["<section>", "<div>", "<span>", "<article>"],
      correct: 1
    },
    {
      question: "What tag is used to define an unordered list?",
      answers: ["<ol>", "<ul>", "<li>", "<list>"],
      correct: 1
    },
    {
      question: "Which tag is used to create a form?",
      answers: ["<form>", "<input>", "<label>", "<fieldset>"],
      correct: 0
    },
    {
      question: "How do you make a checkbox in HTML?",
      answers: ['<input type="checkbox">', '<checkbox>', '<input checkbox>', '<box type="check">'],
      correct: 0
    },
    {
      question: "Which tag is used to embed video in HTML?",
      answers: ["<video>", "<media>", "<embed>", "<vid>"],
      correct: 0
    }
  ];

  const css = [
    {
      question: "What does CSS stand for?",
      answers: ["Cascading Style Sheets", "Creative Style System", "Computer Styled Sections", "Colorful Style Sheets"],
      correct: 0
    },
    {
      question: "How do you change the background color in CSS?",
      answers: ["background-color", "color", "bgcolor", "backgroundImage"],
      correct: 0
    },
    {
      question: "Which property is used to change text color?",
      answers: ["color", "font-color", "text-color", "textColor"],
      correct: 0
    },
    {
      question: "How do you select an element with id 'header'?",
      answers: ["#header", ".header", "header", "*header"],
      correct: 0
    },
    {
      question: "Which symbol is used for class selectors?",
      answers: [".", "#", "*", "$"],
      correct: 0
    },
    {
      question: "Which property controls the text size?",
      answers: ["font-size", "text-size", "font", "text-style"],
      correct: 0
    },
    {
      question: "How do you make text bold in CSS?",
      answers: ["font-weight: bold;", "font: bold;", "text-weight: bold;", "bold: true;"],
      correct: 0
    },
    {
      question: "What is the default position value in CSS?",
      answers: ["static", "relative", "absolute", "fixed"],
      correct: 0
    },
    {
      question: "Which property is used for spacing inside elements?",
      answers: ["padding", "margin", "space", "border-spacing"],
      correct: 0
    },
    {
      question: "How do you apply a style to all `<p>` tags?",
      answers: ["p { }", "#p { }", ".p { }", "<p> { }"],
      correct: 0
    },
    {
      question: "How do you link a CSS file to HTML?",
      answers: ['<link rel="stylesheet" href="style.css">', '<style src="style.css">', '<script href="style.css">', '<css src="style.css">'],
      correct: 0
    },
    {
      question: "Which unit is relative to the parent element?",
      answers: ["em", "px", "%", "rem"],
      correct: 0
    },
    {
      question: "How do you center a block element horizontally?",
      answers: ["margin: auto;", "align: center;", "text-align: center;", "float: center;"],
      correct: 0
    },
    {
      question: "Which property changes the shape of the cursor?",
      answers: ["cursor", "pointer", "hover", "mouse"],
      correct: 0
    },
    {
      question: "Which pseudo-class targets the first child?",
      answers: [":first-child", ":first", ":child-first", ":nth-child(1)"],
      correct: 0
    }
  ];

  const javascript = [
    {
      question: "Which keyword declares a variable?",
      answers: ["var", "int", "let", "both var and let"],
      correct: 3
    },
    {
      question: "How do you write 'Hello World' in an alert box?",
      answers: ["alert('Hello World');", "msg('Hello World');", "prompt('Hello World');", "confirm('Hello World');"],
      correct: 0
    },
    {
      question: "What is the correct syntax for a function?",
      answers: ["function myFunc() {}", "def myFunc()", "function:myFunc()", "func myFunc()"],
      correct: 0
    },
    {
      question: "What does `===` mean?",
      answers: ["equal value and type", "equal value", "assign value", "none"],
      correct: 0
    },
    {
      question: "Which method adds an item to an array?",
      answers: ["push()", "add()", "insert()", "append()"],
      correct: 0
    },
    {
      question: "How do you write a comment in JavaScript?",
      answers: ["// comment", "# comment", "/* comment */", "-- comment"],
      correct: 0
    },
    {
      question: "What is `NaN`?",
      answers: ["Not a Number", "Negative and Null", "Not a Name", "New Array Name"],
      correct: 0
    },
    {
      question: "Which event occurs when a user clicks on an HTML element?",
      answers: ["onclick", "onhover", "onmouse", "onpress"],
      correct: 0
    },
    {
      question: "How do you create a loop?",
      answers: ["for (i=0; i<5; i++)", "repeat (i<5)", "loop i in range", "while (i<5)"],
      correct: 0
    },
    {
      question: "Which operator is used to assign a value?",
      answers: ["=", "==", ":=", "=>"],
      correct: 0
    },
    {
      question: "What is used to define a constant?",
      answers: ["const", "let", "define", "perm"],
      correct: 0
    },
    {
      question: "Which object is the browser window?",
      answers: ["window", "document", "screen", "location"],
      correct: 0
    },
    {
      question: "How do you round 4.7 down to the nearest integer?",
      answers: ["Math.floor(4.7)", "Math.round(4.7)", "Math.down(4.7)", "floor(4.7)"],
      correct: 0
    },
    {
      question: "What will `typeof null` return?",
      answers: ["object", "null", "undefined", "error"],
      correct: 0
    },
    {
      question: "Which function parses JSON strings?",
      answers: ["JSON.parse()", "JSON.stringify()", "parse.JSON()", "JSON.decode()"],
      correct: 0
    }
  ];

  const php = [
    {
      question: "What does PHP stand for?",
      answers: ["PHP: Hypertext Preprocessor", "Personal Home Page", "Private Hypertext Processor", "Public Home Page"],
      correct: 0
    },
    {
      question: "Which symbol starts a PHP variable?",
      answers: ["$", "%", "@", "&"],
      correct: 0
    },
    {
      question: "How do you write a comment in PHP?",
      answers: ["// comment", "/* comment */", "# comment", "All of the above"],
      correct: 3
    },
    {
      question: "Which function outputs text in PHP?",
      answers: ["echo", "print", "write", "Both echo and print"],
      correct: 3
    },
    {
      question: "Which superglobal contains form data?",
      answers: ["$_POST", "$form", "$postdata", "formdata"],
      correct: 0
    },
    {
      question: "How do you connect to a MySQL database?",
      answers: ["mysqli_connect()", "mysql_connect()", "connect_db()", "db_connect()"],
      correct: 0
    },
    {
      question: "What is used to include files?",
      answers: ["include", "require", "Both", "None"],
      correct: 2
    },
    {
      question: "How to start a session?",
      answers: ["session_start()", "start_session()", "session()", "begin_session()"],
      correct: 0
    },
    {
      question: "What does `isset()` do?",
      answers: ["Checks if a variable is set", "Unset variable", "Check type", "Return null"],
      correct: 0
    },
    {
      question: "Which tag is used to write PHP in HTML?",
      answers: ["<?php ?>", "<php>", "<script>", "<? ?>"],
      correct: 0
    },
    {
      question: "How do you end a PHP statement?",
      answers: [";", ".", ":", ","],
      correct: 0
    },
    {
      question: "Which function returns the length of a string?",
      answers: ["strlen()", "count()", "length()", "size()"],
      correct: 0
    },
    {
      question: "How to get the current date?",
      answers: ["date()", "today()", "getDate()", "now()"],
      correct: 0
    },
    {
      question: "What operator is used for concatenation?",
      answers: [".", "+", "&", "*"],
      correct: 0
    },
    {
      question: "Which error is fatal?",
      answers: ["E_ERROR", "E_WARNING", "E_NOTICE", "E_STRICT"],
      correct: 0
    }
  ];

  const mysql = [
    {
      question: "What does SQL stand for?",
      answers: ["Structured Query Language", "System Query List", "Sequential Question Language", "Server Query Language"],
      correct: 0
    },
    {
      question: "Which command is used to fetch data?",
      answers: ["SELECT", "GET", "FETCH", "SHOW"],
      correct: 0
    },
    {
      question: "Which keyword creates a new table?",
      answers: ["CREATE TABLE", "NEW TABLE", "MAKE TABLE", "INSERT TABLE"],
      correct: 0
    },
    {
      question: "What is a primary key?",
      answers: ["Unique identifier", "Duplicate column", "Foreign key", "Reference ID"],
      correct: 0
    },
    {
      question: "Which clause sorts the result?",
      answers: ["ORDER BY", "SORT BY", "GROUP BY", "RANK BY"],
      correct: 0
    },
    {
      question: "How do you remove records?",
      answers: ["DELETE", "REMOVE", "DROP", "ERASE"],
      correct: 0
    },
    {
      question: "Which SQL clause groups rows?",
      answers: ["GROUP BY", "ORDER BY", "COLLECT", "MERGE"],
      correct: 0
    },
    {
      question: "Which statement adds a new row?",
      answers: ["INSERT INTO", "ADD ROW", "APPEND", "UPDATE"],
      correct: 0
    },
    {
      question: "Which SQL command modifies data?",
      answers: ["UPDATE", "MODIFY", "CHANGE", "EDIT"],
      correct: 0
    },
    {
      question: "Which operator matches patterns?",
      answers: ["LIKE", "MATCHES", "PATTERN", "="],
      correct: 0
    },
    {
      question: "How do you prevent duplicate values?",
      answers: ["UNIQUE", "PRIMARY", "KEY", "INDEX"],
      correct: 0
    },
    {
      question: "Which command removes a table?",
      answers: ["DROP TABLE", "DELETE TABLE", "REMOVE", "CLEAR"],
      correct: 0
    },
    {
      question: "What is a foreign key?",
      answers: ["Links two tables", "Main table ID", "Auto-increment key", "Not allowed"],
      correct: 0
    },
    {
      question: "How do you get current date?",
      answers: ["NOW()", "DATE()", "GETDATE()", "CURRENT()"],
      correct: 0
    },
    {
      question: "Which function counts rows?",
      answers: ["COUNT()", "TOTAL()", "SUM()", "NUMBER()"],
      correct: 0
    }
  ];

  const categories = { html, css, javascript, php, mysql };
  return categories[category].slice(0, 15);
}


// Start game
startButton.addEventListener("click", () => {
  username = usernameInput.value.trim();
  if (!username) return alert("Enter your name");
  category = categorySelect.value;
  if (!category) return alert("Choose a category");

  questions = generateQuestions();
  shuffled = questions.sort(() => Math.random() - 0.5);
  index = 0; score = 0;

  landing.classList.add("hidden");
  quizBox.classList.remove("hidden");
  resultBox.classList.add("hidden");
  nextQuestion();
});

// Next question loader
function nextQuestion() {
  clearInterval(timer);
  timeLeft = 15;
  timerDisplay.textContent = `Time left: ${timeLeft}s`;
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time left: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      timeoutSound.play();
      showAnswers(-1);
    }
  }, 1000);

  showProgress();
  showAnswers();
}

// Display question & answers
function showAnswers(autoIndex = null) {
  const q = shuffled[index];
  questionElement.textContent = q.question;
  answerButtons.innerHTML = "";

  q.answers.forEach((ans, i) => {
    const btn = document.createElement("button");
    btn.textContent = ans;
    btn.classList.add("btn");
    btn.disabled = autoIndex !== null;
    btn.onclick = () => selectAnswer(i);
    if (autoIndex !== null) {
      if (i === q.correct) btn.style.background = "#2ecc71";
      else btn.style.opacity = 0.5;
    }
    answerButtons.appendChild(btn);
  });

  nextButton.classList.toggle("hidden", autoIndex === null);

  // Score & sounds should only happen when autoIndex is provided
  if (autoIndex !== null) {
    clearInterval(timer); // ⬅️ only stop timer after answer
    if (autoIndex === q.correct) { score++; correctSound.play(); }
    else wrongSound.play();
  }
}

// Process player's answer
function selectAnswer(i) {
  clearInterval(timer);
  showAnswers(i);
  nextButton.classList.remove("hidden");
}

// Progress bar & counter
function showProgress() {
  const pct = ((index) / 20) * 100;
  progressBar.style.width = `${pct}%`;
}

// Next button click
nextButton.addEventListener("click", () => {
  index++;
  if (index < shuffled.length) nextQuestion();
  else finishQuiz();
});

// Finish quiz & update leaderboard
function finishQuiz() {
  clearInterval(timer);
  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");
  resultBox.innerHTML = `<h2>${username}, you scored ${score}/20!</h2>`;
  
  leaderboard.unshift({ name: username, category, score, date: new Date().toLocaleString() });
  if (leaderboard.length > 10) leaderboard.pop();
  localStorage.setItem("quizLeaderboard", JSON.stringify(leaderboard));
  updateLeaderboard();

  startButton.textContent = "Play Again";
  landing.classList.remove("hidden");
}

// Load leaderboard list
function updateLeaderboard() {
  leaderboardList.innerHTML = "";
  leaderboard.forEach(entry => {
    const li = document.createElement("li");
    li.textContent = `${entry.name} (${entry.category}) — ${entry.score}/20`;
    leaderboardList.appendChild(li);
  });
}

updateLeaderboard();
