phrasesToRemove = []
prevNumOfLabelsFound = 0

// Getting values selected by user in Options
chrome.storage.sync.get({ "phrasesToRemove": ["WebTransaction/SpringController/"]}, function (options) {
    phrasesToRemove = options.phrasesToRemove;
    console.log(phrasesToRemove);
});

// Wait for 2 seconds so as to let the Widgets load
// and then set the observer on them
var checkExist = setTimeout(function () { 
    if (checkIfListItemsLoaded()) {
        setObserver();
    }
}, 2000);

// Gets all spans currently visible and replaces
// occurrences of each phrase to remove with empty string
// Since mutation observer might get called many times,
// only performs the replace when new spans are visible
function removeJunk(phrasesToRemove) {
    allLabels = getAllElementsWithLabels(); 
    currNumOfLabels = allLabels.length;
    if (shouldReplacePhrases(currNumOfLabels, prevNumOfLabelsFound)) {  
        prevNumOfLabelsFound = currNumOfLabels; 
        for (e of allLabels) {
            for (phrase of phrasesToRemove) {   
                if (e.innerHTML.includes(phrase)) { 
                    const replaced = e.innerHTML.replace(phrase, '');
                    e.innerHTML = replaced;
                    e.title = replaced;
                }
            }
        }
    }
}

// Helper to decide whether any new labels/spans are in view
function shouldReplacePhrases(curr, prev) {
    return curr != prev;
}

function checkIfListItemsLoaded() {    
    return $('div[class*=MosaicWidget').length > 0;
}

// Returns all spans with the word "label" in their class
function getAllElementsWithLabels() {
    return $('span[class*=label]');
}

// Only getting Widget divs to add to observer
function getElementsToObserve() {
    elements = $('div[class*=MosaicWidget]')    
    return elements;
}

// Mutation Observer - runs the removeJunk function when
// any change is detected in the Widget divs
var observer = new MutationObserver(function(mutations) {
    removeJunk(phrasesToRemove);
});

// Adds each of the Widget divs to observer
// TODO: observer is never disconnected, which might lead to 
// memory issues
function setObserver() {
    observer.disconnect();
    elements = getElementsToObserve()
    for (e of elements) {
        observer.observe(e, {attributes: true, childList: true, subtree: true});
    }
}
