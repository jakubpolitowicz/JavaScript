document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('searchInput').value = '';
  document.getElementById('result').innerText = '';

  // Add event listeners
  document.getElementById('searchInput').addEventListener('input', function() {
    const searchPhrase = document.getElementById('searchInput').value;
    if (searchPhrase) {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'search', phrase: searchPhrase }, function(response) {
          if (chrome.runtime.lastError || !response) {
            document.getElementById('result').innerText = 'No occurrences found.';
            return;
          }
          document.getElementById('result').innerText = `Found ${response.count} occurrences. Currently selected: ${response.currentIndex}`;
        });
      });
    } else {
      document.getElementById('result').innerText = '';
    }
  });

  document.getElementById('nextButton').addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'next' }, function(response) {
        if (chrome.runtime.lastError || !response) {
          document.getElementById('result').innerText = 'No more occurrences.';
          return;
        }
        document.getElementById('result').innerText = `Currently selected: ${response.currentIndex}`;
      });
    });
  });

  document.getElementById('prevButton').addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'prev' }, function(response) {
        if (chrome.runtime.lastError || !response) {
          document.getElementById('result').innerText = 'No previous occurrences.';
          return;
        }
        document.getElementById('result').innerText = `Currently selected: ${response.currentIndex}`;
      });
    });
  });
});