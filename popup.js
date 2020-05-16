const addWordButton = document.querySelector("#addWordButton");
const addWordInput = document.querySelector("#addWordInput");
const wordList = document.querySelector("#wordList");
const currentWord = document.querySelector("#currentWord");
const practiceInput = document.querySelector("#practiceInput");

let words = JSON.parse(localStorage.getItem("words"));

currentWordArr = [];

// populate word list
if (words === null) {
  words = [];
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
      localStorage.setItem("words", JSON.stringify(words));
      newWord.remove();
      practiceInput.value = "";
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
    localStorage.setItem("words", JSON.stringify(words));

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
      localStorage.setItem("words", JSON.stringify(words));
      newWord.remove();
      practiceInput.value = "";
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
  const currLen = this.value.length;
  if (this.value === currentWordArr.join("")) {
    // word spelled correctly
    practiceInput.style.cssText = "background-color: #5cb85c";
    setTimeout(() => {
      practiceInput.classList.add("correct-spelling");
      practiceInput.style.cssText = "rgb(243, 239, 239);";
    }, 500);
    setTimeout(() => {
      practiceInput.classList.remove("correct-spelling");
      practiceInput.value = "";
      currentWord.innerText = replace(currentWordArr.join(""));
    }, 750);
  } else if (this.value[currLen - 1] !== currentWordArr[currLen - 1]) {
    practiceInput.style.cssText = "background: #d9534f";
  } else {
    practiceInput.style.cssText = "rgb(243, 239, 239);";
  }
});

function replace(str) {
  return str
    .split("")
    .map((char) => (Math.random() > 0.5 ? " " : char))
    .join("");
}
