const phrasesTextArea = document.getElementById('phrases');
const button = document.getElementById('saveButton');
const message = document.getElementById('messageSpan');
const DEFAULT  = "WebTransaction/SpringController/";

chrome.storage.sync.get({ "phrasesToRemove": ["WebTransaction/SpringController/"] }, function (options) {    
    for (phrase of options.phrasesToRemove) {
        if (phrase != DEFAULT && phrase != "") {
            phrasesTextArea.value += phrase.trim()
            phrasesTextArea.value += "\n"
        }
    }
});

// Gets current value of textarea, splits by new line to get an array
// Empty values are filtered out before the array is stored in chrome storage
button.addEventListener('click', (event) => {
    currentPhrases = phrasesTextArea.value.trim();    
    phrasesArray = currentPhrases.split("\n")  
    phrasesArray = phrasesArray.filter(item => item != "");
    chrome.storage.sync.set({ "phrasesToRemove": phrasesArray }, function () {
        messageSpan.innerHTML = "Successfully saved your options!";
    });
});