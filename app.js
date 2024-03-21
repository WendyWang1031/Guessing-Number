//  Random number
let targetNumber = Math.floor(Math.random() * 100) + 1;
console.log("answer: " + targetNumber);

//  在全域環境宣告userGuessTimes使用者猜測次數為0
let userGuessTimes = 0;
let restTimes = 5;
//  宣告變數抓取HTML的元素
const guessInputField = document.getElementById("guessField");
const guessSubmit = document.getElementById("guessSubmit");
const hintMessage = document.querySelector(".message");
const lowerBound = document.querySelector(".lowerBound");
const upperBound = document.querySelector(".upperBound");
const finalMessage = document.querySelector(".finalMessage");
const finalAnswer = document.getElementById("finalAnswer");
const playAgain = document.getElementById("playAgain");
const hintRestartSeconds = document.querySelector(".second");
const titleTimes = document.querySelector(".title-times");

// 為按鈕添加事件監聽器，執行該函式
guessSubmit.addEventListener("click", checkGuess);
finalAnswer.addEventListener("click", showFinalMessage);
playAgain.addEventListener("click", reStartGame);

// 揭曉答案
function showFinalMessage() {
  event.preventDefault();
  finalMessage.textContent = "揭曉答案是：" + targetNumber;
}

// 重置遊戲
function resetGame() {
  targetNumber = Math.floor(Math.random() * 100) + 1;
  console.log("answer: " + targetNumber);
  userGuessTimes = 0;
  restTimes = 5;
  guessSubmit.disabled = false;
  hintMessage.textContent = "";
  lowerBound.textContent = 1;
  upperBound.textContent = 100;
  finalMessage.textContent = "";
  hintRestartSeconds.textContent = "";
  titleTimes.textContent = 5;
  guessInputField.value = "";
  guessInputField.focus();
}

// 重新開啟遊戲
function reStartGame() {
  event.preventDefault();
  resetGame();
}

// 確認使用者猜測的數字是否符合條件
function checkGuess() {
  //使用preventDefault表單默認提交行為會被阻止，頁面不會被重新加載
  event.preventDefault();
  let userGuess = parseInt(guessInputField.value);
  console.log("userGuess: " + userGuess);
  if (
    isNaN(userGuess) ||
    userGuess < 0 ||
    userGuess > 100 ||
    userGuess < lowerBound.textContent ||
    userGuess > upperBound.textContent
  ) {
    alert("請輸入有效的數字！");
    return;
  } else {
    submitGuess();
  }
}

// 提交猜測數字，頁面有相對應的反饋
function submitGuess() {
  let userGuess = parseInt(guessInputField.value);
  restTimes--;
  userGuessTimes++;
  console.log("userGuessTimes: " + userGuessTimes);

  if (userGuess === targetNumber && userGuessTimes <= 5) {
    hintMessage.textContent = `恭喜你，你猜對了！你這次猜了 ${userGuessTimes}  次哦～`;
    hintMessage.style.color = "green";
    guessInputField.disabled = true;
    titleTimes.textContent = 0;
    countDownAndReset();
  } else if (userGuess < targetNumber && userGuessTimes < 5) {
    hintMessage.textContent = `太小了，再試一次。你已經猜了${userGuessTimes} 次哦～`;
    hintMessage.style.color = "red";
    lowerBound.textContent = userGuess;
    titleTimes.textContent = restTimes;
  } else if (userGuess > targetNumber && userGuessTimes < 5) {
    hintMessage.textContent = `太大了，再試一次。你已經猜了${userGuessTimes} 次哦～`;
    hintMessage.style.color = "red";
    upperBound.textContent = userGuess;
    titleTimes.textContent = restTimes;
  } else {
    hintMessage.textContent = `You Failed ! 答案是 ${targetNumber}`;
    hintMessage.style.color = "red";
    guessInputField.disabled = true;
    countDownAndReset();
  }

  guessInputField.value = "";
  //focus元素為設置焦點
  guessInputField.focus();
}

//更改瀏覽器的倒數文本
function display(result) {
  hintRestartSeconds.textContent = result;
}
//倒數計時器放入三個參數，使用IIFE並放入時間計時器函式能被立即執行
function delayedDisplay(string, seconds, callback) {
  setTimeout(() => {
    callback(string);
  }, seconds);
}

//讓delayedDisplay放入參數，製造出倒數與文字效果
function countDownAndReset() {
  delayedDisplay("倒數計時5秒，即將開啟下一局", 0, display);
  delayedDisplay("倒數計時4秒，即將開啟下一局", 1000, display);
  delayedDisplay("倒數計時3秒，即將開啟下一局", 2000, display);
  delayedDisplay("倒數計時2秒，即將開啟下一局", 3000, display);
  delayedDisplay("倒數計時1秒，即將開啟下一局", 4000, display);
  delayedDisplay("倒數計時0秒，即將開啟下一局", 5000, () => {
    resetGame();
  });
}
