let currentIndex = 0;
let matches = [];

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'search') {
    const phrase = request.phrase;
    currentIndex = 0;
    matches = [];
    removeHighlights();
    if (phrase) {
      highlightText(document.body, phrase);
      if (matches.length > 0) {
        highlightMatch(currentIndex);
      }
    }
    sendResponse({ count: matches.length, currentIndex: matches.length > 0 ? currentIndex + 1 : 0 });
  } else if (request.action === 'next') {
    if (matches.length > 0) {
      currentIndex = (currentIndex + 1) % matches.length;
      highlightMatch(currentIndex);
    }
    sendResponse({ currentIndex: matches.length > 0 ? currentIndex + 1 : 0 });
  } else if (request.action === 'prev') {
    if (matches.length > 0) {
      currentIndex = (currentIndex - 1 + matches.length) % matches.length;
      highlightMatch(currentIndex);
    }
    sendResponse({ currentIndex: matches.length > 0 ? currentIndex + 1 : 0 });
  }
});

chrome.runtime.onSuspend.addListener(() => {
  currentIndex = 0;
  matches = [];
  removeHighlights();
});

function removeHighlights() {
  document.querySelectorAll('mark.highlight').forEach(mark => {
    const parent = mark.parentNode;
    parent.replaceChild(document.createTextNode(mark.textContent), mark);
    parent.normalize();
  });
}

function highlightText(rootNode, phrase) {
  const textNodes = [];
  const walk = document.createTreeWalker(rootNode, NodeFilter.SHOW_TEXT, null, false);
  let node;
  while (node = walk.nextNode()) {
    textNodes.push(node);
  }
  textNodes.forEach(node => {
    const regex = new RegExp(phrase, 'gi');
    const matchesForNode = node.nodeValue.match(regex);
    if (matchesForNode) {
      const fragment = document.createDocumentFragment();
      let lastIndex = 0;
      matchesForNode.forEach(match => {
        const index = node.nodeValue.indexOf(match, lastIndex);
        if (index > -1) {
          fragment.appendChild(document.createTextNode(node.nodeValue.substring(lastIndex, index)));
          const mark = document.createElement('mark');
          mark.className = 'highlight';
          mark.textContent = match;
          mark.style.backgroundColor = 'orange';
          fragment.appendChild(mark);
          lastIndex = index + match.length;
          matches.push(mark);
        }
      });
      fragment.appendChild(document.createTextNode(node.nodeValue.substring(lastIndex)));
      node.parentNode.replaceChild(fragment, node);
    }
  });
}

function highlightMatch(index) {
  matches.forEach((mark, i) => {
    if (i === index) {
      mark.scrollIntoView({ behavior: 'smooth', block: 'center' });
      mark.style.backgroundColor = 'yellow';
    } else {
      mark.style.backgroundColor = 'orange';
    }
  });
}