Main();

chrome.runtime.onMessage.addListener(Main);

function Main () {
    temp = document.body.innerHTML;
    let words = document.body.innerText.split(" ");
    words.forEach(word => makeTypo(word+" "));
    document.body.innerHTML = temp;
}

function getRandom(max) {
    return Math.floor((Math.random() * 10) % max)
}

function AtPos(str, position, newStr) {
    return str.slice(0, position) + newStr + str.slice(position);
}

function Typo(word) {
    let index = getRandom(word.length);
    let letter = word[index];
    let newString = AtPos(word, index, letter);
    if(getRandom(1)) newString = AtPos(newString, index, letter);
    return newString;
}

function makeTypo(word) {
temp = temp.replace(word, Typo(word));
};
