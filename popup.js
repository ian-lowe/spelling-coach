const addWordButton = document.querySelector("#addWordButton");
const addWordInput = document.querySelector("#addWordInput");
const wordList = document.querySelector("#wordList");

let words = JSON.parse(localStorage.getItem("words"));

// populate word list
if (words === null) {
  words = [];
} else {
  for (let i = 0; i < words.length; i++) {
    const newWord = document.createElement("div");
    newWord.innerText = words[i];
    wordList.appendChild(newWord);
    const newX = document.createElement("span");
    newX.innerText = "X";
    wordList.lastChild.appendChild(newX);

    newX.addEventListener("click", function(e) {
      // this is kind of ghetto. innerText includes the text inside of the span for the delete button, so it needs to be removed before processing the deletion.
      const wordToDelete = newWord.innerText.substr(
        0,
        newWord.innerText.length - 1
      );
      console.log(wordToDelete);
      const index = words.indexOf(wordToDelete);
      words.splice(index, 1);
      localStorage.setItem("words", JSON.stringify(words));
      newWord.remove();
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
      console.log(wordToDelete);
      const index = words.indexOf(wordToDelete);
      words.splice(index, 1);
      localStorage.setItem("words", JSON.stringify(words));
      newWord.remove();
    });
  }
  addWordInput.value = "";
});
