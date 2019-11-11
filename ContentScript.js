Main();

chrome.runtime.onMessage.addListener(Main);

function Main () {
    ["span", "title", "a", "p", "h1","h2","h3","h4", "h5", "h6"].forEach(tag => Typoifier(tag));
}

function getRandom(max) {
    return Math.floor((Math.random() * 10) % max)
}

function AtPos(str, position, newStr) {
    return str.slice(0, position) + newStr + str.slice(position);
}

function TypoSTR(str) {
    if(str.length === 0) return
    let words = str.split(" ");
    words.forEach((word, index) => {
        if(word.length === 0) return
        if (getRandom(2)) words[index] = Typo(word);
    })
    return words.join(" ");
}

function Typo(word) {
    let index = getRandom(word.length);
    let letter = word[index];
    let newString = AtPos(word, index, letter);
    if(getRandom(2)) newString = AtPos(newString, index, letter);
    return newString;
}

function Typoifier(tagName) {
    document.querySelectorAll(tagName).forEach(e => {
	if(e.innerText === "") return
        e.innerText = TypoSTR(e.innerText);
    });
};
