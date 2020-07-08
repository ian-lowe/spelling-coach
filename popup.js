const addWordButton = document.querySelector("#addWordButton");
const addWordInput = document.querySelector("#addWordInput");
const wordList = document.querySelector("#wordList");
const currentWord = document.querySelector("#currentWord");
const practiceInput = document.querySelector("#practiceInput");
const statsButton = document.querySelector("#statsButton");
const statsPopup = document.querySelector("#statsPopup");
const app = document.querySelector("#app");
const modalCloseButton = document.querySelector("#modalCloseButton");
const wordScoreList = document.querySelector("#wordScoreList");
const numScoreList = document.querySelector("#numScoreList");
const overlay = document.querySelector("#overlay");

let words = JSON.parse(localStorage.getItem("words"));
let wordData = JSON.parse(localStorage.getItem("wordData"));

currentWordArr = [];

// populate word list
if (words === null) {
  words = [];
  wordData = {};
} else {
  for (let i = 0; i < words.length; i++) {
    const newWord = document.createElement("div");
    newWord.setAttribute("tabindex", 0);
    newWord.innerText = words[i];
    wordList.appendChild(newWord);
    const newX = document.createElement("span");
    newX.innerText = "X";
    wordList.lastChild.appendChild(newX);

    newX.addEventListener("click", function (e) {
      const wordToDelete = words[i];
      const index = words.indexOf(wordToDelete);
      words.splice(index, 1);
      delete wordData[wordToDelete];
      localStorage.setItem("words", JSON.stringify(words));
      localStorage.setItem("wordData", JSON.stringify(wordData));
      newWord.remove();
      practiceInput.value = "";

      if (wordToDelete == currentWordArr.join("")) {
        currentWordArr = [];
        currentWord.innerText = "";
      }
    });

    newWord.addEventListener("click", function (e) {
      if (e.target === this) {
        const word = this.innerText.substr(0, newWord.innerText.length - 2);
        currentWord.innerText = replace(word);
        currentWordArr = word.split("");
        practiceInput.style.cssText = "rgb(243, 239, 239);";
        practiceInput.value = "";
        practiceInput.focus();
        const otherWords = document.querySelectorAll("#wordList div");
        for (let n = 0; n < otherWords.length; n++) {
          otherWords[n].style.cssText = "color: black";
        }
        this.style.cssText =
          "color: rgb(243, 239, 239); border-left: 3px solid #5cb85c";
      }
    });

    newWord.addEventListener("keyup", function (e) {
      if (e.target === this) {
        if (e.key === "Enter") {
          const word = this.innerText.substr(0, newWord.innerText.length - 2);
          currentWord.innerText = replace(word);
          currentWordArr = word.split("");
          practiceInput.style.cssText = "rgb(243, 239, 239);";
          practiceInput.value = "";
          practiceInput.focus();
          const otherWords = document.querySelectorAll("#wordList div");
          for (let n = 0; n < otherWords.length; n++) {
            otherWords[n].style.cssText = "color: black";
          }
          this.style.cssText =
            "color: rgb(243, 239, 239); border-left: 3px solid #5cb85c";
        }
      }
    });
  }
}

addWordButton.addEventListener("click", function () {
  const inputValue = addWordInput.value.toLowerCase().replace(/\s/g, "");
  if (inputValue != "" && words.includes(inputValue) != true) {
    // add to localStorage
    words.push(inputValue);
    wordData[inputValue] = 0;
    localStorage.setItem("words", JSON.stringify(words));
    localStorage.setItem("wordData", JSON.stringify(wordData));

    // add to dom
    const newWord = document.createElement("div");
    newWord.setAttribute("tabindex", 0);
    newWord.innerText = inputValue;
    wordList.appendChild(newWord);
    const newX = document.createElement("span");
    newX.innerText = "X";
    wordList.lastChild.appendChild(newX);
    wordList.scrollTop = wordList.scrollHeight;

    newX.addEventListener("click", function (e) {
      const wordToDelete = newWord.innerText.substr(
        0,
        newWord.innerText.length - 2
      );

      const index = words.indexOf(wordToDelete);
      words.splice(index, 1);
      delete wordData[wordToDelete];
      localStorage.setItem("words", JSON.stringify(words));
      localStorage.setItem("wordData", JSON.stringify(wordData));
      newWord.remove();
      practiceInput.value = "";

      if (wordToDelete == currentWordArr.join("")) {
        currentWordArr = [];
        currentWord.innerText = "";
      }
    });

    newWord.addEventListener("click", function (e) {
      if (e.target === this) {
        // -2 gets rid of X from the span, as well as a phantom enter key press that was being logged when splitting the word into an array.
        const word = newWord.innerText.substr(0, newWord.innerText.length - 2);
        currentWord.innerText = replace(word);
        currentWordArr = word.split("");
        practiceInput.style.cssText = "rgb(243, 239, 239);";
        practiceInput.value = "";
        practiceInput.focus();
        const otherWords = document.querySelectorAll("#wordList div");
        for (let n = 0; n < otherWords.length; n++) {
          otherWords[n].style.cssText = "color: black";
        }
        this.style.cssText =
          "color: rgb(243, 239, 239); border-left: 3px solid #5cb85c";
      }
    });

    newWord.addEventListener("keyup", function (e) {
      if (e.target === this) {
        if (e.key === "Enter") {
          const word = newWord.innerText.substr(
            0,
            newWord.innerText.length - 2
          );
          currentWord.innerText = replace(word);
          currentWordArr = word.split("");
          practiceInput.style.cssText = "rgb(243, 239, 239);";
          practiceInput.value = "";
          practiceInput.focus();
          const otherWords = document.querySelectorAll("#wordList div");
          for (let n = 0; n < otherWords.length; n++) {
            otherWords[n].style.cssText = "color: black";
          }
          this.style.cssText =
            "color: rgb(243, 239, 239); border-left: 3px solid #5cb85c";
        }
      }
    });
  }
  addWordInput.value = "";
});

practiceInput.addEventListener("input", function () {
  // if no word selected, do nothing.
  if (currentWordArr == "") {
    return;
  }
  const currLen = this.value.length;
  const currentWordString = currentWordArr.join("");
  if (this.value === currentWordString) {
    // word spelled correctly
    practiceInput.readOnly = true;
    practiceInput.style.cssText = "background-color: #5cb85c";
    // add to word count and update localStorage
    wordData[currentWordString] += 1;
    localStorage.setItem("wordData", JSON.stringify(wordData));
    setTimeout(() => {
      practiceInput.classList.add("correct-spelling");
      practiceInput.style.cssText = "rgb(243, 239, 239);";
    }, 500);
    setTimeout(() => {
      practiceInput.classList.remove("correct-spelling");
      practiceInput.value = "";
      currentWord.innerText = replace(currentWordString);
      practiceInput.readOnly = false;
    }, 750);
  } else if (this.value !== currentWordString.substr(0, currLen)) {
    practiceInput.style.cssText = "background: #d9534f";
  } else {
    practiceInput.style.cssText = "rgb(243, 239, 239);";
  }
});

statsButton.addEventListener("click", function () {
  statsPopup.style.display = "block";
  overlay.style.display = "block";

  // render word list
  for (word of words) {
    const newLi = document.createElement("li");
    const newLi2 = document.createElement("li");
    newLi.innerText = word;
    newLi2.innerText = wordData[word];
    wordScoreList.appendChild(newLi);
    numScoreList.appendChild(newLi2);
  }
});

modalCloseButton.addEventListener("click", function () {
  statsPopup.style.display = "none";
  overlay.style.display = "none";

  // remove words from score list
  for (word of words) {
    wordScoreList.removeChild(wordScoreList.lastChild);
    numScoreList.removeChild(numScoreList.lastChild);
  }
});

function replace(str) {
  return str
    .split("")
    .map((char) => (Math.random() > 0.5 ? " " : char))
    .join("");
}
