const addWordButton = document.querySelector("#addWordButton");
const addWordInput = document.querySelector("#addWordInput");
const wordList = document.querySelector("#wordList");
const currentWord = document.querySelector("#currentWord");
const practiceInput = document.querySelector("#practiceInput");

let words = JSON.parse(localStorage.getItem("words"));

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

    newX.addEventListener("click", function(e) {
      const wordToDelete = words[i];
      const index = words.indexOf(wordToDelete);
      words.splice(index, 1);
      localStorage.setItem("words", JSON.stringify(words));
      newWord.remove();
    });

    newWord.addEventListener("click", function(e) {
      if (e.target === this) {
        currentWord.innerText = words[i];
        practiceInput.value = "";
        practiceInput.focus();
      }
    });
  }
}

addWordButton.addEventListener("click", function() {
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

    newX.addEventListener("click", function(e) {
      const wordToDelete = newWord.innerText.substr(
        0,
        newWord.innerText.length - 1
      );

      const index = words.indexOf(wordToDelete);
      words.splice(index, 1);
      localStorage.setItem("words", JSON.stringify(words));
      newWord.remove();
    });

    newWord.addEventListener("click", function(e) {
      if (e.target === this) {
        const word = newWord.innerText.substr(0, newWord.innerText.length - 1);
        currentWord.innerText = replace(word);
        practiceInput.value = "";
        practiceInput.focus();
      }
    });
  }
  addWordInput.value = "";
});

function replace(str) {
  return str
    .split("")
    .map(char => (Math.random() > 0.5 ? " " : char))
    .join("");
}
