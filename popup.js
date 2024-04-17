
document.getElementById('clickme').addEventListener('click', function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    // Inject the font link into the webpage
    chrome.scripting.executeScript({
      target: {tabId: tabs[0].id},
      function: injectFontLink
    });

    // Modify paragraph styles including the new font
    chrome.scripting.executeScript({
      target: {tabId: tabs[0].id},
      function: modifyParagraphStyle
    });
  });
});

// Function to inject the Google Fonts link
function injectFontLink() {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Joti+One&display=swap';
  document.head.appendChild(link);
}

// Function to modify paragraph style
function modifyParagraphStyle() {

  // declare colors array
  var text_colors = new Array();
  var text_colors = ["#9900ff", "#0000ff", "#cc0000","#ff00ff", "#da8300", "#00bd00"];

  const paragraphs = document.querySelectorAll('p');
  paragraphs.forEach(p => {
    p.style.color = text_colors[0];
    p.style.fontSize = '14px';
    // p.style.backgroundColor = 'yellow';
    p.style.fontFamily = "'Joti One', cursive"; // Set the font family to Joti One
  });
}
