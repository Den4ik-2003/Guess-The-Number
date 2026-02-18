// ----- Function Random Number -----
function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

// ----- Change Level -----
const levelEazy = document.getElementById("levelEazy");
const levelMedium = document.getElementById("levelMedium");
const levelHard = document.getElementById("levelHard");
const diapazoe = document.getElementById("diapazoe");
let counterNumber = 0;
let activeLevel = "eazy";

levelEazy.addEventListener("click", function () {
  diapazoe.innerText = "0-100";
  levelEazy.classList.add("active");
  levelMedium.classList.remove("active");
  levelHard.classList.remove("active");
  activeLevel = "eazy";
  updateNumber();
  updateCounter();
});

levelMedium.addEventListener("click", function () {
  diapazoe.innerText = "0-500";
  levelEazy.classList.remove("active");
  levelMedium.classList.add("active");
  levelHard.classList.remove("active");
  activeLevel = "medium";
  updateNumber();
  updateCounter();
});

levelHard.addEventListener("click", function () {
  diapazoe.innerText = "0-1000";
  levelEazy.classList.remove("active");
  levelMedium.classList.remove("active");
  levelHard.classList.add("active");
  activeLevel = "hard";
  updateNumber();
  updateCounter();
});

// ----- Update Counter -----
function updateCounter() {
  counterNumber = 0;
  counter.innerText = counterNumber;
}

// ----- Change and Update Random Number -----
const updateRandomNumber = document.querySelector(".secondary");
const checkNumberButton = document.querySelector(".primary");
const userNumberValue = document.querySelector("#userNumberValue");
const historyItem = document.querySelector(".history-list");

let randomNumber;
updateNumber();

function updateNumber() {
  if (activeLevel == "eazy") {
    randomNumber = getRandomInt(0, 100);
    historyItem.innerHTML = "";
  } else if (activeLevel == "medium") {
    randomNumber = getRandomInt(0, 500);
    historyItem.innerHTML = "";
  } else if (activeLevel == "hard") {
    randomNumber = getRandomInt(0, 1000);
    historyItem.innerHTML = "";
  }
}

updateRandomNumber.addEventListener("click", function () {
  updateNumber();
  updateCounter();
  historyItem.innerHTML = "";
});

// ----- Check Number -----
const modalInfo = document.querySelector(".modalInfo");
checkNumberButton.addEventListener("click", function () {
  if (userNumberValue.value == "") {
    modalMessage("Ви ввели неправильні дані!");
  } else {
    if (activeLevel === "eazy") {
      if (userNumberValue.value < 0 || userNumberValue.value > 100) {
        modalMessage("Ви ввели неправильні дані!");
      } else {
        auditNumber(Number(userNumberValue.value));
        userNumberValue.value = "";
      }
    }

    if (activeLevel === "medium") {
      if (userNumberValue.value < 0 || userNumberValue.value > 500) {
        modalMessage("Ви ввели неправильні дані!");
      } else {
        auditNumber(Number(userNumberValue.value));
        userNumberValue.value = "";
      }
    }

    if (activeLevel === "hard") {
      if (userNumberValue.value < 0 || userNumberValue.value > 1000) {
        modalMessage("Ви ввели неправильні дані!");
      } else {
        auditNumber(Number(userNumberValue.value));
        userNumberValue.value = "";
      }
    }
  }
});

// ----- Audit Number -----
const modal = document.querySelector(".modal");
function auditNumber(number) {
  if (number == randomNumber) {
    historyItem.innerHTML = "";
    counterNumber++;
    counter.innerText = counterNumber;
    recordUser(activeLevel,counterNumber);
    modalMessage("Ви виграли!");
    updateCounter()
    updateNumber();
  } else if (number > randomNumber) {
    counterNumber++;
    counter.innerText = counterNumber;
    history(userNumberValue.value, "менше");
  } else if (number < randomNumber) {
    counterNumber++;
    counter.innerText = counterNumber;
    history(userNumberValue.value, "більше");
  }
}

// ----- User Win -----
const closeButton = document.querySelector(".close");

closeButton.addEventListener("click", function () {
  modal.style.display = "none";
  setRecord(activeLevel);
});

// ----- Modal Message -----
function modalMessage(message) {
  modalInfo.innerText = message;
  modal.style.display = "flex";
}

// ----- Counter -----
const counter = document.getElementById("count");

// ----- History Function -----
function history(number, message) {
  const block = document.createElement("div");
  block.classList.add("history-item");
  block.innerText = `Ви ввели ${number}, але загадане число є ${message}!`;
  historyItem.appendChild(block);
}

// ----- Record From Local Storage -----
const eazyRecord = Number(localStorage.getItem("eazy")) || Infinity;
const mediumRecord = Number(localStorage.getItem("medium")) || Infinity;
const hardRecord = Number(localStorage.getItem("hard")) || Infinity;

const recordEazyText = document.querySelector(".recordEazy");
const recordMediumText = document.querySelector(".recordMedium");
const recordHardText = document.querySelector(".recordHard");

function setRecord(level) {
if(level === "eazy") {
  if(localStorage.getItem("eazy") == null) {
    recordEazyText.innerText = "0";
  } else {
    recordEazyText.innerText = localStorage.getItem("eazy");
  }
}

if(level === "medium") {
  if(localStorage.getItem("medium") == null) {
    recordMediumText.innerText = "0";
  } else {
    recordMediumText.innerText = localStorage.getItem("medium");
  }
}

if(level === "hard") {
  if(localStorage.getItem("hard") == null) {
    recordHardText.innerText = "0";
  } else {
    recordHardText.innerText = localStorage.getItem("hard");
  }
}
}

setRecord(activeLevel);

function recordUser(level, counter) {
  if (level === "eazy") {
    let eazyRecord = Number(localStorage.getItem("eazy")) || Infinity;
    if (counter <= eazyRecord) {
      localStorage.setItem("eazy", counter);
      recordEazyText.innerText = counter;
      modalMessage("Вітаю у вас рекорд!");
    }
  }

  if (level === "medium") {
    let mediumRecord = Number(localStorage.getItem("medium")) || Infinity;
    if (counter <= mediumRecord) {
      localStorage.setItem("medium", counter);
      recordMediumText.innerText = counter;
      modalMessage("Вітаю у вас рекорд!");
    }
  }

  if (level === "hard") {
    let hardRecord = Number(localStorage.getItem("hard")) || Infinity;
    if (counter <= hardRecord) {
      localStorage.setItem("hard", counter);
      recordHardText.innerText = counter;
      modalMessage("Вітаю у вас рекорд!");
    }
  }
}

