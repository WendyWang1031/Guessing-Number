//  Random number
let targetNumber = Math.floor(Math.random() * 100) + 1;
console.log("answer: " + targetNumber);

//  在全域環境宣告userGuessTimes使用者猜測次數為0
let userGuessTimes = 0;
let webShowTimes = 5;
//  Get element
const guessField = document.getElementById("guessField");
const guessSubmit = document.getElementById("guessSubmit");
const message = document.querySelector(".message");
const lowerBound = document.querySelector(".lowerBound");
const upperBound = document.querySelector(".upperBound");
const finalMessage = document.querySelector(".finalMessage");
const finalAnswer = document.getElementById("finalAnswer");
const playAgain = document.getElementById("playAgain");
const second = document.querySelector(".second");
const titleTimes = document.querySelector(".title-times");

// Event listener
guessSubmit.addEventListener("click", checkGuess);
finalAnswer.addEventListener("click", showFinalMessage);
playAgain.addEventListener("click", resetGame);

//  showFinalMassage函數是呈現揭曉答案
function showFinalMessage() {
  finalMessage.textContent = "揭曉答案是：" + targetNumber;
}

// resetGame 函數 重置遊戲
function resetGame() {
  targetNumber = Math.floor(Math.random() * 100) + 1;
  console.log("answer: " + targetNumber);
  userGuessTimes = 0;
  message.textContent = "";
  finalMessage.textContent = "";
  guessSubmit.disabled = false;
  lowerBound.textContent = 1;
  upperBound.textContent = 100;
  second.textContent = "";
  webShowTimes = 5;
  titleTimes.textContent = 5;
  guessField.value = "";
  guessField.focus();
}

// Guess function
function checkGuess() {
  const userGuess = parseInt(guessField.value);
  console.log("userGuess: " + userGuess);
  webShowTimes--;
  userGuessTimes++;
  console.log("userGuessTimes: " + userGuessTimes);
  //檢查是否輸入文字
  if (isNaN(userGuess)) {
    alert("請輸入有效的數字！");
    titleTimes.textContent = webShowTimes;
    return false;
  } else if (userGuess === targetNumber && userGuessTimes <= 5) {
    message.textContent = `恭喜你，你猜對了！你這次猜了 ${userGuessTimes}  次哦～`;
    message.style.color = "green";
    guessSubmit.disabled = true;
    countDownAndReset();
  } else if (userGuess < targetNumber && userGuessTimes < 5) {
    message.textContent = `太小了，再試一次。你已經猜了${userGuessTimes} 次哦～`;
    message.style.color = "red";
    lowerBound.textContent = userGuess;
    titleTimes.textContent = webShowTimes;
  } else if (userGuess > targetNumber && userGuessTimes < 5) {
    message.textContent = `太大了，再試一次。你已經猜了${userGuessTimes} 次哦～`;
    message.style.color = "red";
    upperBound.textContent = userGuess;
    titleTimes.textContent = webShowTimes;
  } else {
    message.textContent = `You Failed! 答案是 ${targetNumber}`;
    message.style.color = "red";
    guessSubmit.disabled = true;
    countDownAndReset();
  }

  guessField.value = "";
  guessField.focus();
}

//更改瀏覽器的倒數數字文本
function display(result) {
  second.textContent = result;
}
//倒數計時器去呼叫display的函數
function delayedDisplay(string, seconds, callback) {
  setTimeout(() => {
    callback(string);
  }, seconds);
}

//讓倒數的函數相對應該有的是值
function countDownAndReset() {
  delayedDisplay("倒數計時5秒即將開啟下一局", 0, display);
  delayedDisplay("倒數計時4秒即將開啟下一局", 1000, display);
  delayedDisplay("倒數計時3秒即將開啟下一局", 2000, display);
  delayedDisplay("倒數計時2秒即將開啟下一局", 3000, display);
  delayedDisplay("倒數計時1秒即將開啟下一局", 4000, () => {
    second.textContent = "倒數完畢，即將開啟下一局遊戲";
    resetGame();
  });
}
