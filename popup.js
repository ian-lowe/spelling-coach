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
  const inputValue = addWordInput.value.toLowerCase().replace(/\s/g, "");
  if (inputValue != "" && words.includes(inputValue) != true) {
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

wordList.addEventListener("click", function(e) {
  const wordToDelete = e.target.innerText;
  const index = words.indexOf(wordToDelete);
  words.splice(index, 1);
  localStorage.setItem("words", JSON.stringify(words));
  e.target.remove();
  console.log(words);
});
