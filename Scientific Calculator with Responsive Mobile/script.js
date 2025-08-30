const display = document.getElementById("display");
const toggle = document.getElementById("themeSwitch");

function appendValue(value) {
  if (display.innerText === "0" || display.innerText === "Error") {
    display.innerText = value;
  } else {
    display.innerText += value;
  }
  playSound('success');
}

function appendSciFunc(func) {
  if (display.innerText === "0" || display.innerText === "Error") {
    display.innerText = func;
  } else {
    display.innerText += func;
  }
  playSound('success');
}

function clearDisplay() {
  display.innerText = "0";
}

function deleteChar() {
  if (display.innerText.length > 1) {
    display.innerText = display.innerText.slice(0, -1);
  } else {
    display.innerText = "0";
  }
}

function calculate() {
  try {
    let expr = display.innerText.replace(/÷/g, '/').replace(/×/g, '*');
    let openBrackets = (expr.match(/\(/g) || []).length;
    let closeBrackets = (expr.match(/\)/g) || []).length;
    expr += ')'.repeat(openBrackets - closeBrackets);

    let result = eval(expr);
    addToHistory(display.innerText + " = " + result);
    display.innerText = result;
    playSound('success');
  } catch {
    display.innerText = "Error";
    playSound('error');
  }
}

function addToHistory(entry) {
  const history = document.getElementById("history");
  const item = document.createElement("li");

  const text = document.createElement("span");
  text.textContent = entry;

  const del = document.createElement("button");
  del.textContent = "×";
  del.onclick = () => history.removeChild(item);

  item.appendChild(text);
  item.appendChild(del);
  history.prepend(item);
}

function playSound(type) {
  const sounds = {
    success: document.getElementById("successSound"),
    error: document.getElementById("errorSound")
  };
  if (sounds[type]) {
    sounds[type].currentTime = 0;
    sounds[type].play();
  }
}

function toggleSci() {
  document.getElementById("sciPanel").classList.toggle("show");
}

document.addEventListener("keydown", (e) => {
  const key = e.key;
  if (!isNaN(key) || ['+', '-', '*', '/', '.', '%'].includes(key)) {
    appendValue(key);
  } else if (key === 'Enter') {
    e.preventDefault();
    calculate();
  } else if (key === 'Backspace') {
    deleteChar();
  } else if (key.toLowerCase() === 'c') {
    clearDisplay();
  }
});

toggle.addEventListener("change", () => {
  document.body.classList.toggle("dark", toggle.checked);
});
