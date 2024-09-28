Main();

chrome.runtime.onMessage.addListener(Main);

function Main() {
    ["span", "title", "a", "p", "h1", "h2", "h3", "h4", "h5", "h6", "td"].forEach(tag => Typoifier(tag));
}

function getRandom(max) {
    return Math.floor((Math.random() * 10) % max)
}

function AtPos(str, position, newStr) {
    return str.slice(0, position) + newStr + str.slice(position);
}

function TypoSTR(str) {
  if (str.length === 0) return;
  let words = str.split(' ');
  words.forEach((word, index) => {
    if (word.length === 0) return;
    // For security links and email addresses wont get a typo
    if (word.includes('://') || word.includes('@')) return;
    if (getRandom(2)) words[index] = Typo(word);
  });
  return words.join(' ');
}

function Typo(word) {
  let index = getRandom(word.length);
  let letter = word[index];
  // If chosen is a number then ignore
  if (!isNaN(letter)) return word;
  let newString = AtPos(word, index, letter);
  if (getRandom(2)) newString = AtPos(newString, index, letter);
  return newString;
}

function Typoifier(tagName) {
    document.querySelectorAll(tagName).forEach(e => {
        e.childNodes.forEach(node => {
            if (node.data === "" || node.data === undefined) return
            node.data = TypoSTR(node.data);
        })
    });
};
