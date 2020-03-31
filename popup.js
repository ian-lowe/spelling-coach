const addWordButton = document.querySelector("#addWordButton");
const addWordInput = document.querySelector("#addWordInput");
const wordList = document.querySelector("#wordList");

addWordButton.addEventListener("click", function() {
  const inputValue = addWordInput.value.replace(/\s/g, "");
  if (inputValue != "") {
    const newWord = document.createElement("div");
    newWord.innerText = inputValue;
    wordList.appendChild(newWord);
  }
  addWordInput.value = "";
});
