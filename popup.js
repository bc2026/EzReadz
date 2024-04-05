// popup.js
document.getElementById('clickme').addEventListener('click', () => {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
chrome.scripting.executeScript   (
      tabs[0].id,
{code: 'document.body.style.backgroundColor = "red"'}
    );
  });
});

