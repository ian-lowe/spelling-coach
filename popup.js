const addWordButton = document.querySelector("#addWordButton");
const addWordInput = document.querySelector("#addWordInput");
const wordList = document.querySelector("#wordList");

let words = JSON.parse(localStorage.getItem("words"));

if (words === null) {
  words = [];
} else {
  for (let i = 0; i < words.length; i++) {
    const newWord = document.createElement("div");
    newWord.innerText = words[i];
    wordList.appendChild(newWord);
  }
}

addWordButton.addEventListener("click", function() {
  const inputValue = addWordInput.value.replace(/\s/g, "");
  if (inputValue != "") {
    // add to localStorage
    words.push(inputValue);
    localStorage.setItem("words", JSON.stringify(words));

    // add to dom
    const newWord = document.createElement("div");
    newWord.innerText = inputValue;
    wordList.appendChild(newWord);
  }
  addWordInput.value = "";
});
