document.getElementById('clickme').addEventListener('click', function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    // First, inject the font link
    chrome.scripting.executeScript({
      target: {tabId: tabs[0].id},
      function: injectFontLink
    }, () => {
      // After the font link is injected, modify paragraph style
      chrome.scripting.executeScript({
        target: {tabId: tabs[0].id},
        function: modifyParagraphStyle
      }, () => {
        // Finally, after modifying paragraph style, colorize the sentences
        chrome.scripting.executeScript({
          target: {tabId: tabs[0].id},
          function: colorizeSentences
        });
      });
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
  const paragraphs = document.querySelectorAll('p');
  paragraphs.forEach(p => {
    //p.style.color = 'red';
    p.style.fontSize = '14px';
    //p.style.fontWeight = 'bold';
    //p.style.backgroundColor = 'yellow';
    p.style.fontFamily = "'Joti One', cursive"; // Set the font family to Joti One
  });
}

function colorizeSentences() {
  const paragraphs = document.querySelectorAll('p');
  const colors = ["#9900ff", "#0000ff", "#cc0000","#ff00ff", "#da8300", "#00bd00"]; // queue
  

  paragraphs.forEach(p => {
    let sentences = p.textContent.split('.').filter(Boolean); // Split text into sentences and filter out any empty entries

    // Clear the original paragraph text
    p.textContent = '';

    sentences.forEach(sentence => {
      const span = document.createElement('span'); // Create a span for each sentence
      const color = colors.shift(); // Get the first color from the queue
      colors.push(color); // Add the color back to the end of the queue

      span.textContent = sentence + (sentence.endsWith('.') ? '' : '.'); // Add the period back if it was removed
      span.style.color = color; // Set the sentence color
      p.appendChild(span); // Append the span back to the paragraph

      const space = document.createTextNode(' '); // Add a space between spans
      p.appendChild(space);
    });
  });
}
