// This script runs whenever a navigation event happens.
// It is required because New Relic website doesn't load the content-script
// always, because of the way navigation works in New Relic. Hence, we inject
// the script using this. It will not run on unallowed hosts, only on New Relic site

chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
  chrome.tabs.executeScript(null, {file:"jquery-3.5.1.min.js"},  () => chrome.runtime.lastError);
  chrome.tabs.executeScript(null, {file:"string-replacer.js"},  () => chrome.runtime.lastError);
});